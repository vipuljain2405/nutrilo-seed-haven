import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import BestSellersSection from "@/components/BestSellersSection";
import WhyNutreloSection from "@/components/WhyNutreloSection";
import BenefitsSection from "@/components/BenefitsSection";
import ComboSection from "@/components/ComboSection";
import SubscriptionSection from "@/components/SubscriptionSection";
import ReviewsSection from "@/components/ReviewsSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategorySection />
      <BestSellersSection />
      <WhyNutreloSection />
      <BenefitsSection />
      <ComboSection />
      <SubscriptionSection />
      <ReviewsSection />
      <InstagramSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
