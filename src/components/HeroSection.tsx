import { motion } from "framer-motion";
import heroImg from "@/assets/hero-seeds.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Seeds" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      {/* Floating seed particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="floating-seed absolute w-2 h-2 rounded-full bg-nutrelo-green/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            🌱 100% Natural · No Preservatives
          </motion.span>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6">
            Healthy Snacking,{" "}
            <span className="text-primary">Redefined</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
            From raw nutrition to bold flavors — discover premium seeds & snacks crafted for modern lifestyles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-button hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Explore Categories
            </a>
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L48 52C96 44 192 28 288 22C384 16 480 20 576 28C672 36 768 48 864 48C960 48 1056 36 1152 28C1248 20 1344 16 1392 14L1440 12V60H0Z" fill="hsl(40 33% 97%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
