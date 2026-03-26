import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import catRaw from "@/assets/cat-raw-seeds.jpg";
import catRoasted from "@/assets/cat-roasted-seeds.jpg";
import catFlavored from "@/assets/cat-flavored-seeds.jpg";
import catMixed from "@/assets/cat-mixed-seeds.jpg";
import catCrackers from "@/assets/cat-seed-crackers.jpg";
import heroImg from "@/assets/hero-seeds.jpg";

const images = [catRaw, catRoasted, catFlavored, catMixed, catCrackers, heroImg];

const InstagramSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Instagram size={22} className="text-nutrelo-orange" />
            <span className="text-nutrelo-orange font-medium text-sm uppercase tracking-widest">@nutrelo.organics</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Follow Our Journey</h2>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square overflow-hidden rounded-xl group cursor-pointer"
            >
              <img
                src={img}
                alt={`Instagram ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
