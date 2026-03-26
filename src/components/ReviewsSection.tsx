import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Priya S.", rating: 5, text: "The Masala Blast seeds are incredibly addictive! Finally a healthy snack that actually tastes amazing.", avatar: "PS" },
  { name: "Rahul M.", rating: 5, text: "Been ordering the Protein Mix Pack for my gym sessions. Great quality and fast delivery.", avatar: "RM" },
  { name: "Ananya K.", rating: 4, text: "Love the subscription option. Fresh seeds delivered monthly, and the 10% savings add up!", avatar: "AK" },
  { name: "Vikram T.", rating: 5, text: "Best pumpkin seeds I've ever had. Roasted to perfection with no preservatives. Highly recommend!", avatar: "VT" },
];

const ReviewsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest">Social Proof</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2">What Our Customers Say</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <Quote size={24} className="text-primary/20 mb-3" />
              <p className="text-sm text-foreground mb-4 leading-relaxed">{review.text}</p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} className={j < review.rating ? "fill-nutrelo-yellow text-nutrelo-yellow" : "text-border"} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {review.avatar}
                </div>
                <span className="text-sm font-medium text-foreground">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
