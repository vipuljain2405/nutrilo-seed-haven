import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Zap, ChevronLeft, Shield, Leaf, Wheat, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import productMasala from "@/assets/product-masala-blast.png";
import productPumpkin from "@/assets/product-roasted-pumpkin.jpg";
import catRaw from "@/assets/cat-raw-seeds.jpg";
import catMixed from "@/assets/cat-mixed-seeds.jpg";

const allProducts: Record<string, {
  name: string; price: number; originalPrice: number; rating: number; reviews: number;
  image: string; description: string; ingredients: string; benefits: string[];
  nutrition: { label: string; value: string }[];
}> = {
  "masala-blast-super-seeds": {
    name: "Masala Blast Super Seeds",
    price: 249, originalPrice: 349, rating: 4.8, reviews: 128,
    image: productMasala,
    description: "A bold fusion of premium pumpkin and sunflower seeds coated in a fiery masala blend. Crunchy, tasty, and packed with nutrition — your perfect guilt-free snack.",
    ingredients: "Pumpkin Seeds, Sunflower Seeds, Spices, Natural Flavouring.",
    benefits: ["High Protein", "Rich in Nutrients", "Healthy Snack", "No Preservatives"],
    nutrition: [
      { label: "Energy", value: "559 kcal" }, { label: "Protein", value: "29 g" },
      { label: "Total Fat", value: "47 g" }, { label: "Carbohydrates", value: "11 g" },
      { label: "Dietary Fiber", value: "6 g" }, { label: "Omega-3", value: "0.2 g" },
      { label: "Iron", value: "8.8 mg" },
    ],
  },
  "roasted-pumpkin-seeds": {
    name: "Roasted Pumpkin Seeds",
    price: 199, originalPrice: 299, rating: 4.7, reviews: 96,
    image: productPumpkin,
    description: "Perfectly roasted premium pumpkin seeds — crunchy, nutritious, and naturally delicious. Rich in zinc and high in protein.",
    ingredients: "Roasted Pumpkin Seeds.",
    benefits: ["High Protein", "Rich in Zinc", "Vegan", "Gluten Free"],
    nutrition: [
      { label: "Energy", value: "559 kcal" }, { label: "Protein", value: "30 g" },
      { label: "Total Fat", value: "49 g" }, { label: "Carbohydrates", value: "11 g" },
      { label: "Dietary Fiber", value: "6 g" }, { label: "Omega-3", value: "0.1 g" },
      { label: "Iron", value: "8.8 mg" },
    ],
  },
};

const defaultProduct = allProducts["masala-blast-super-seeds"];

const ProductPage = () => {
  const { slug } = useParams();
  const product = (slug && allProducts[slug]) || defaultProduct;
  const [qty, setQty] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ChevronLeft size={16} /> Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl overflow-hidden bg-muted shadow-card"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
              <span className="inline-block px-3 py-1 rounded-full bg-nutrelo-orange/10 text-nutrelo-orange text-xs font-bold w-fit mb-3">
                Best Seller
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-nutrelo-yellow text-nutrelo-yellow" : "text-border"} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-sm font-bold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.benefits.map((b) => (
                  <span key={b} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    ✓ {b}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-foreground">Qty:</span>
                <div className="flex items-center border border-border rounded-full overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-foreground hover:bg-muted transition-colors">−</button>
                  <span className="px-4 py-2 font-medium text-foreground">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-4 py-2 text-foreground hover:bg-muted transition-colors">+</button>
                </div>
                <span className="text-sm text-muted-foreground">Net Wt. 100g</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button className="flex-1 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-button hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button className="flex-1 px-8 py-4 rounded-full bg-nutrelo-orange text-accent-foreground font-semibold hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                  <Zap size={18} /> Buy Now
                </button>
              </div>

              <div className="flex gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Shield size={14} className="text-primary" /> FSSAI Certified</span>
                <span className="flex items-center gap-1"><Leaf size={14} className="text-primary" /> 100% Natural</span>
              </div>
            </motion.div>
          </div>

          {/* Nutrition & Details */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card"
            >
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-4">Ingredients</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{product.ingredients}</p>

              <h3 className="font-display text-xl font-bold text-foreground mb-4">Storage</h3>
              <p className="text-muted-foreground">Store in a cool & dry place.</p>

              <div className="mt-6 p-4 rounded-xl bg-muted">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Manufactured & Packed By:</strong><br />
                  Nutrelo Organics<br />
                  New Delhi - 110007<br />
                  FSSAI Lic No: XXXX XXXXX
                </p>
              </div>
            </motion.div>
          </div>

          {/* Reviews on product page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-8">Customer Reviews</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Priya S.", text: "Absolutely love these seeds! Great taste and so healthy.", rating: 5 },
                { name: "Rahul M.", text: "Perfect snack for my evening cravings. Highly recommended!", rating: 5 },
                { name: "Sneha D.", text: "Good quality and fresh. Will order again for sure.", rating: 4 },
              ].map((r, i) => (
                <div key={i} className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className={j < r.rating ? "fill-nutrelo-yellow text-nutrelo-yellow" : "text-border"} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground mb-3">{r.text}</p>
                  <span className="text-sm font-medium text-muted-foreground">{r.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductPage;
