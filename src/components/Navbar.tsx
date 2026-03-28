import { ShoppingCart, Menu, X, User, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/nutrelo-logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Combos", href: "/#combos" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const { totalItems, setIsOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Nutrelo" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display text-xl font-bold text-foreground">Nutrelo</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link to="/admin" className="p-2 text-nutrelo-orange hover:text-primary transition-colors" title="Admin">
              <Shield size={20} />
            </Link>
          )}
          <button onClick={() => setIsOpen(true)} className="relative p-2 text-foreground hover:text-primary transition-colors">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-nutrelo-orange text-[10px] font-bold flex items-center justify-center text-accent-foreground">
              {totalItems}
            </span>
          </button>
          {user ? (
            <button onClick={() => signOut()} className="p-2 text-foreground hover:text-primary transition-colors" title="Sign Out">
              <LogOut size={20} />
            </button>
          ) : (
            <Link to="/auth" className="p-2 text-foreground hover:text-primary transition-colors" title="Sign In">
              <User size={20} />
            </Link>
          )}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm font-medium text-foreground py-2" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
