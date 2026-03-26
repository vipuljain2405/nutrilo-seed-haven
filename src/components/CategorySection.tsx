import { motion } from "framer-motion";
import catRaw from "@/assets/cat-raw-seeds.jpg";
import catRoasted from "@/assets/cat-roasted-seeds.jpg";
import catFlavored from "@/assets/cat-flavored-seeds.jpg";
import catMixed from "@/assets/cat-mixed-seeds.jpg";
import catCrackers from "@/assets/cat-seed-crackers.jpg";
import { Sprout, Flame, Sparkles, Blend, Cookie } from "lucide-react";

const categories = [
  { name: "Raw Seeds", icon: Sprout, image: catRaw, color: "bg-nutrelo-green/10" },
  { name: "Roasted Seeds", icon: Flame, image: catRoasted, color: "bg-nutrelo-orange/10" },
  { name: "Flavored Seeds", icon: Sparkles, image: catFlavored, color: "bg-nutrelo-yellow/10" },
  { name: "Mixed Seeds", icon: Blend, image: catMixed, color: "bg-nutrelo-brown/10" },
  { name: "Seed Crackers", icon: Cookie, image: catCrackers, color: "bg-nutrelo-olive/10" },
];

const CategorySection = () => {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest">Our Collection</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">
            Browse by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href="/shop"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <div className={`inline-flex p-2 rounded-full ${cat.color} mb-2`}>
                  <cat.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-primary-foreground">{cat.name}</h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
