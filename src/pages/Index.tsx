
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Index component mounting - checking auth state');
    
    let mounted = true;

    const getSession = async () => {
      try {
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
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.email || 'No session');
      if (mounted) {
        setSession(session);
        setLoading(false);
      }
    });

    // Get initial session
    getSession();

    // Add timeout fallback to prevent infinite loading
    const timeout = setTimeout(() => {
      if (mounted && loading) {
        console.log('Session check timeout - showing landing page');
        setLoading(false);
        setSession(null);
      }
    }, 3000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen app-gradient-bg flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  console.log('Rendering Index with session:', session?.user?.email || 'No session');
  return session ? <HomePage session={session} /> : <LandingPage />;
};

export default Index;
