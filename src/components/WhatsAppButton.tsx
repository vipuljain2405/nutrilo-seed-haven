import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919000000000?text=Hi%20Nutrelo!%20I%27d%20like%20to%20place%20an%20order"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-card-hover hover:scale-105 transition-transform duration-300"
      style={{ backgroundColor: "#25D366" }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      <MessageCircle size={22} className="text-primary-foreground" />
      <span className="text-primary-foreground font-semibold text-sm hidden sm:inline">Order on WhatsApp</span>
    </motion.a>
  );
};

export default WhatsAppButton;
