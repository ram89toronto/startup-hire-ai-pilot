
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Header } from "@/components/layout/Header";
import { AppContent } from "@/components/layout/AppContent";

const DashboardPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"dashboard" | "prompt-generator" | "analytics" | "settings">("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Dashboard component mounting - checking auth state');
    
    let mounted = true;

    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Dashboard session check:', session?.user?.email || 'No session');
        
        if (mounted) {
          if (!session) {
            // Not authenticated, redirect to home
            navigate('/');
            return;
          }
          setSession(session);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        if (mounted) {
          navigate('/');
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Dashboard auth state changed:', _event, session?.user?.email || 'No session');
      if (mounted) {
        if (!session) {
          navigate('/');
          return;
        }
        setSession(session);
        setLoading(false);
      }
    });

    // Get initial session
    getSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = () => {
    supabase.auth.signOut().then(() => navigate('/'));
  };

  if (loading) {
    return (
      <div className="min-h-screen app-gradient-bg flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen app-gradient-bg font-primary">
      <Header
        isLoggedIn={true}
        setIsLoggedIn={handleSignOut}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <AppContent session={session} activeView={activeView} />
    </div>
  );
};

export default DashboardPage;
