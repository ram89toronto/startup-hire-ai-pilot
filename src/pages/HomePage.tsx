
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Header } from "@/components/layout/Header";
import { AppContent } from "@/components/layout/AppContent";

type HomePageProps = {
  session: Session;
};

const HomePage = ({ session }: HomePageProps) => {
  const [activeView, setActiveView] = useState<"dashboard" | "prompt-generator" | "analytics" | "settings">("dashboard");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen app-gradient-bg font-primary">
      <Header
        isLoggedIn={true}
        setIsLoggedIn={() => {
          supabase.auth.signOut().then(() => navigate('/'));
        }}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <AppContent session={session} activeView={activeView} />
    </div>
  );
};

export default HomePage;
