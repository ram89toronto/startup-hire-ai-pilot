
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Header } from "@/components/layout/Header";
import { AppContent } from "@/components/layout/AppContent";
import { isDemoSession, getDemoUser, signOutWithCleanup, clearDemoSession } from "@/utils/authUtils";
import { toast } from "sonner";

const DashboardPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"dashboard" | "prompt-generator" | "analytics" | "settings">("dashboard");
  const [isDemoActive, setIsDemoActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Dashboard component mounting - checking auth state');
    
    let mounted = true;

    const checkAuthState = async () => {
      try {
        // Check for demo session first
        const demoActive = isDemoSession();
        console.log('Demo session check:', demoActive);
        
        if (demoActive) {
          const demoUser = getDemoUser();
          console.log('Demo user:', demoUser);
          
          if (mounted) {
            setIsDemoActive(true);
            // Create mock session for demo
            setSession({
              user: demoUser,
              access_token: 'demo-token',
              expires_at: Date.now() + 3600000,
            } as any);
            setLoading(false);
          }
          return;
        }

        // Check for real Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Dashboard session check:', session?.user?.email || 'No session');
        
        if (mounted) {
          if (!session) {
            // Not authenticated and no demo - redirect to auth
            navigate('/auth');
            return;
          }
          setSession(session);
          setIsDemoActive(false);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        if (mounted) {
          navigate('/auth');
        }
      }
    };

    // Set up auth state listener for real sessions
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Dashboard auth state changed:', _event, session?.user?.email || 'No session');
      if (mounted) {
        if (!session && !isDemoSession()) {
          navigate('/auth');
          return;
        }
        if (session) {
          setSession(session);
          setIsDemoActive(false);
          setLoading(false);
        }
      }
    });

    // Initial check
    checkAuthState();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    console.log('Sign out requested');
    
    if (isDemoActive) {
      // Handle demo logout
      clearDemoSession();
      setIsDemoActive(false);
      setSession(null);
      toast.success('Demo session ended');
      navigate('/');
    } else {
      // Handle real logout
      await signOutWithCleanup();
      setSession(null);
      toast.success('Signed out successfully');
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen app-gradient-bg flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
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
      {isDemoActive && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Demo Mode Active
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
