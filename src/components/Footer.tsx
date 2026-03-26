import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/nutrelo-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Nutrelo" className="h-10 w-10 rounded-full" />
              <span className="font-display text-xl font-bold">Nutrelo</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Crafted for modern lifestyles, Nutrelo brings you clean, flavourful snacks made to upgrade your everyday snacking.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="/" className="hover:opacity-100 transition-opacity">Home</a></li>
              <li><a href="/shop" className="hover:opacity-100 transition-opacity">Shop</a></li>
              <li><a href="/#combos" className="hover:opacity-100 transition-opacity">Combo Packs</a></li>
              <li><a href="/#about" className="hover:opacity-100 transition-opacity">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Policies</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Shipping Policy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Return Policy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-center gap-2"><Mail size={14} /> care@nutrelo.com</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +91 9000000000</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> New Delhi, India</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-sm opacity-50">
          <p>© 2026 Nutrelo Organics. All rights reserved. FSSAI Lic No: XXXX XXXXX</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
