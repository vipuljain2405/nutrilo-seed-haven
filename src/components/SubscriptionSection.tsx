import { motion } from "framer-motion";
import { CheckCircle, RefreshCw, Truck } from "lucide-react";

const SubscriptionSection = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-card rounded-3xl overflow-hidden shadow-card-hover border border-border"
        >
          <div className="p-8 md:p-12 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-nutrelo-orange/10 text-nutrelo-orange text-sm font-bold mb-4">
              Save 10% Every Month
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Subscribe & Save
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Never run out of your favorite seeds. Get automatic deliveries and save 10% on every order.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {[
                { icon: RefreshCw, title: "Flexible Plans", desc: "Weekly or monthly delivery" },
                { icon: Truck, title: "Free Shipping", desc: "On all subscription orders" },
                { icon: CheckCircle, title: "Cancel Anytime", desc: "No commitment required" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-3">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-button hover:-translate-y-0.5 transition-all duration-300">
                Subscribe Monthly — ₹449/month
              </button>
              <button className="px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                Subscribe Weekly — ₹129/week
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
