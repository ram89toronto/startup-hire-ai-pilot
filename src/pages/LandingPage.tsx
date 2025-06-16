
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
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

type LandingPageProps = {
  session?: Session | null;
};

const LandingPage = ({ session }: LandingPageProps) => {
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (session) {
      // User is logged in, take them to their dashboard
      navigate("/dashboard");
    } else {
      // User not logged in, take them to auth page
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen app-gradient-bg font-primary">
      <Header
        isLoggedIn={!!session}
        setIsLoggedIn={handleAuthAction}
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
