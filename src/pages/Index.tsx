
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { isDemoSession, getDemoUser } from "@/utils/authUtils";
import LandingPage from "./LandingPage";

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoActive, setIsDemoActive] = useState(false);

  useEffect(() => {
    console.log('Index component mounting - checking auth state');
    
    let mounted = true;

    const checkAuthState = async () => {
      try {
        // Check for demo session first
        const demoActive = isDemoSession();
        console.log('Demo session active:', demoActive);
        
        if (demoActive) {
          const demoUser = getDemoUser();
          if (mounted) {
            setIsDemoActive(true);
            setSession({
              user: demoUser,
              access_token: 'demo-token',
              expires_at: Date.now() + 3600000,
            } as Session);
            setLoading(false);
          }
          return;
        }

        // Check for real Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session check:', session?.user?.email || 'No session');
        
        if (mounted) {
          setSession(session);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        if (mounted) {
          setSession(null);
          setIsDemoActive(false);
          setLoading(false);
        }
      }
    };

    // Set up auth state listener for real sessions only
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.email || 'No session');
      if (mounted && !isDemoSession()) {
        setSession(session);
        setIsDemoActive(false);
        setLoading(false);
      }
    });

    // Initial check
    checkAuthState();

    // Add timeout fallback to prevent infinite loading
    const timeout = setTimeout(() => {
      if (mounted && loading) {
        console.log('Session check timeout - showing landing page');
        setLoading(false);
      }
    }, 3000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen app-gradient-bg flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Create a mock session object for demo users
  const effectiveSession = isDemoActive ? {
    user: getDemoUser(),
    access_token: 'demo-token',
    expires_at: Date.now() + 3600000,
  } as Session : session;

  console.log('Rendering Index with session:', effectiveSession?.user?.email || 'No session');
  return <LandingPage session={effectiveSession} />;
};

export default Index;
