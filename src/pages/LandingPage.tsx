
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { LogosSection } from "@/components/landing/LogosSection";
import { PainPointsSection } from "@/components/landing/PainPointsSection";
import { SuccessStoriesSection } from "@/components/landing/SuccessStoriesSection";
import { FeaturesShowcase } from "@/components/sections/FeaturesShowcase";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { CTASection } from "@/components/sections/CTASection";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen app-gradient-bg font-primary">
      <Header
        isLoggedIn={false}
        setIsLoggedIn={() => navigate("/auth")}
        activeView="dashboard"
        setActiveView={() => {}}
      />
      <div className="w-full">
        <HeroSection />
        <LogosSection />
        <PainPointsSection />
        <FeaturesShowcase />
        <TestimonialsSection />
        <SuccessStoriesSection />
        <PricingSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
