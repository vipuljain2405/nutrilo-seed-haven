import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import productMasala from "@/assets/product-masala-blast.png";
import productPumpkin from "@/assets/product-roasted-pumpkin.jpg";
import catRaw from "@/assets/cat-raw-seeds.jpg";
import catMixed from "@/assets/cat-mixed-seeds.jpg";

const products = [
  {
    id: 1,
    name: "Masala Blast Super Seeds",
    price: 249,
    originalPrice: 349,
    rating: 4.8,
    reviews: 128,
    image: productMasala,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Roasted Pumpkin Seeds",
    price: 199,
    originalPrice: 299,
    rating: 4.7,
    reviews: 96,
    image: productPumpkin,
    badge: "Popular",
  },
  {
    id: 3,
    name: "Raw Sunflower Seeds",
    price: 179,
    originalPrice: 249,
    rating: 4.6,
    reviews: 74,
    image: catRaw,
    badge: "New",
  },
  {
    id: 4,
    name: "Mixed Seeds Power Pack",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviews: 152,
    image: catMixed,
    badge: "Top Rated",
  },
];

const BestSellersSection = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-nutrelo-orange text-accent-foreground text-xs font-bold">
                  {product.badge}
                </span>
                <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-destructive/90 text-destructive-foreground text-xs font-bold">
                  Limited Stock
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className={j < Math.floor(product.rating) ? "fill-nutrelo-yellow text-nutrelo-yellow" : "text-border"}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-foreground">₹{product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                  </div>
                  <button className="p-2.5 rounded-full bg-primary text-primary-foreground hover:shadow-button transition-all duration-300 hover:scale-105">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
