import { motion } from "framer-motion";
import { Fish, Salad, Zap, HeartPulse } from "lucide-react";

const benefits = [
  { icon: Fish, title: "Rich in Omega-3", desc: "Essential fatty acids for brain health" },
  { icon: Salad, title: "High Fiber", desc: "Supports digestion and gut health" },
  { icon: Zap, title: "Energy Boosting", desc: "Natural fuel for your active lifestyle" },
  { icon: HeartPulse, title: "Heart Healthy", desc: "Promotes cardiovascular wellness" },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-nutrelo-green-light font-medium text-sm uppercase tracking-widest">Nutrition Benefits</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">Powered by Nature</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 shadow-card">
                <b.icon size={32} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
