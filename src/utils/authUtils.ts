
import { supabase } from "@/integrations/supabase/client";

// Clean up all auth-related storage keys
export const cleanupAuthState = () => {
  console.log('Cleaning up auth state...');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  if (typeof sessionStorage !== 'undefined') {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  }
};

// Sign out with cleanup - fixed to avoid infinite redirects
export const signOutWithCleanup = async () => {
  console.log('Signing out with cleanup...');
  try {
    // Clear demo session first if active
    if (isDemoSession()) {
      clearDemoSession();
    }
    
    // Clean up auth state
    cleanupAuthState();
    
    // Attempt global sign out for real sessions
    await supabase.auth.signOut({ scope: 'global' });
  } catch (error) {
    console.error('Error during sign out:', error);
    // Even if sign out fails, we've cleaned up local state
  }
  
  // Return without forcing page reload - let React Router handle navigation
  return true;
};

// Create demo session (temporary solution)
export const createDemoSession = () => {
  console.log('Creating demo session...');
  // Store demo flag in localStorage for persistence
  localStorage.setItem('demo_user_active', 'true');
  localStorage.setItem('demo_user_data', JSON.stringify({
    id: 'demo-user-id',
    email: 'demo@example.com',
    full_name: 'Demo User'
  }));
};

// Check if demo session is active
export const isDemoSession = () => {
  return localStorage.getItem('demo_user_active') === 'true';
};

// Get demo user data
export const getDemoUser = () => {
  const demoData = localStorage.getItem('demo_user_data');
  return demoData ? JSON.parse(demoData) : null;
};

// Clear demo session
export const clearDemoSession = () => {
  localStorage.removeItem('demo_user_active');
  localStorage.removeItem('demo_user_data');
};
