import { motion } from "framer-motion";
import { Package, Tag, ArrowRight } from "lucide-react";
import productMasala from "@/assets/product-masala-blast.png";
import productPumpkin from "@/assets/product-roasted-pumpkin.jpg";

const combos = [
  {
    name: "Healthy Starter Pack",
    desc: "Roasted Pumpkin + Raw Sunflower + Mixed Seeds",
    price: 499,
    originalPrice: 647,
    savings: 148,
    image: productPumpkin,
  },
  {
    name: "Protein Mix Pack",
    desc: "Masala Blast + Mixed Seeds Power + Roasted Pumpkin",
    price: 649,
    originalPrice: 847,
    savings: 198,
    image: productMasala,
  },
];

const ComboSection = () => {
  return (
    <section id="combos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-nutrelo-orange font-medium text-sm uppercase tracking-widest">Bundle & Save</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">Combo Packs</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Get more value with our curated bundles</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {combos.map((combo, i) => (
            <motion.div
              key={combo.name}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
            >
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-nutrelo-orange text-accent-foreground text-sm font-bold flex items-center gap-1">
                <Tag size={14} />
                Save ₹{combo.savings}
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden">
                  <img src={combo.image} alt={combo.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="sm:w-3/5 p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={18} className="text-primary" />
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">Combo</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{combo.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{combo.desc}</p>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-bold text-foreground">₹{combo.price}</span>
                    <span className="text-muted-foreground line-through">₹{combo.originalPrice}</span>
                  </div>
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-button hover:-translate-y-0.5 transition-all duration-300 w-fit">
                    Add to Cart <ArrowRight size={16} />
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

export default ComboSection;
