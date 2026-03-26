import { motion } from "framer-motion";
import { Leaf, Shield, Wheat, Heart } from "lucide-react";

const reasons = [
  { icon: Leaf, title: "100% Natural", desc: "Pure, clean ingredients with zero artificial additives" },
  { icon: Shield, title: "High Protein", desc: "Packed with plant-based protein for your daily needs" },
  { icon: Wheat, title: "No Preservatives", desc: "Fresh from farm to pack, naturally preserved" },
  { icon: Heart, title: "Farm Fresh Quality", desc: "Sourced from the finest organic farms" },
];

const WhyNutreloSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest">The Nutrelo Promise</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">Why Nutrelo?</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                <r.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNutreloSection;
