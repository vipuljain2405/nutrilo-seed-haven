import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";

const BestSellersSection = () => {
  const { data: products, isLoading } = useProducts();
  const { addToCart } = useCart();

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-nutrelo-orange font-medium text-sm uppercase tracking-widest">Most Loved</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">Best Sellers</h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-card animate-pulse">
                <div className="aspect-square bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-5 bg-muted rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <Link to={`/product/${product.slug}`}>
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-nutrelo-orange text-accent-foreground text-xs font-bold">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-5">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-foreground">₹{product.price}</span>
                      {product.original_price && (
                        <span className="text-sm text-muted-foreground line-through">₹{product.original_price}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="p-2.5 rounded-full bg-primary text-primary-foreground hover:shadow-button transition-all duration-300 hover:scale-105"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellersSection;
