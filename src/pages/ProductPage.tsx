import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Zap, ChevronLeft, Shield, Leaf } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";

const ProductPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading } = useProduct(slug);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 pb-16 container mx-auto px-4 flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 pb-16 container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-muted-foreground text-lg">Product not found</p>
          <Link to="/" className="text-primary hover:underline">Go back to shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = async () => {
    for (let i = 0; i < qty; i++) {
      await addToCart(product.id);
    }
  };

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ChevronLeft size={16} /> Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="rounded-3xl overflow-hidden bg-muted shadow-card">
              <img src={product.image_url || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
              {product.badge && (
                <span className="inline-block px-3 py-1 rounded-full bg-nutrelo-orange/10 text-nutrelo-orange text-xs font-bold w-fit mb-3">
                  {product.badge}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">{product.name}</h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
                {product.original_price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">₹{product.original_price}</span>
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-sm font-bold">{discount}% OFF</span>
                  </>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              {product.benefits?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.benefits.map((b) => (
                    <span key={b} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">✓ {b}</span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-foreground">Qty:</span>
                <div className="flex items-center border border-border rounded-full overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-foreground hover:bg-muted transition-colors">−</button>
                  <span className="px-4 py-2 font-medium text-foreground">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-4 py-2 text-foreground hover:bg-muted transition-colors">+</button>
                </div>
                <span className="text-sm text-muted-foreground">Net Wt. {product.weight}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button onClick={handleAddToCart} className="flex-1 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-button hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>

              <div className="flex gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Shield size={14} className="text-primary" /> FSSAI Certified</span>
                <span className="flex items-center gap-1"><Leaf size={14} className="text-primary" /> 100% Natural</span>
              </div>
            </motion.div>
          </div>

          {/* Nutrition & Details */}
          {product.nutrition?.length > 0 && (
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 shadow-card">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Nutrition Information (Per 100g)</h3>
                <div className="space-y-3">
                  {product.nutrition.map((n) => (
                    <div key={n.label} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{n.label}</span>
                      <span className="font-medium text-foreground">{n.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 shadow-card">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Ingredients</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{product.ingredients}</p>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Storage</h3>
                <p className="text-muted-foreground">Store in a cool & dry place.</p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductPage;
