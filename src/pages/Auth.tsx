
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { Rocket, ArrowLeft, Loader2 } from 'lucide-react';
import { cleanupAuthState, createDemoSession } from '@/utils/authUtils';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in attempt with email:', email);
    setLoading(true);
    
    try {
      // Clean up existing state before signing in
      cleanupAuthState();
      
      // Attempt to sign out any existing session
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('No existing session to sign out');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password 
      });
      
      console.log('Sign in response:', { data, error });
      
      if (error) {
        console.error('Sign in error:', error);
        
        // Provide user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please check your credentials.');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Please check your email and confirm your account before signing in.');
        } else {
          toast.error(error.message);
        }
      } else if (data.user) {
        console.log('Sign in successful, user:', data.user.email);
        toast.success('Welcome back!');
        // Use React Router navigation instead of forced reload
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Unexpected error during sign in:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up attempt with email:', email);
    setLoading(true);
    
    try {
      // Clean up existing state before signing up
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      console.log('Sign up response:', { data, error });
      
      if (error) {
        console.error('Sign up error:', error);
        
        // Provide user-friendly error messages
        if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists. Please sign in instead.');
        } else if (error.message.includes('Password should be at least')) {
          toast.error('Password must be at least 6 characters long.');
        } else {
          toast.error(error.message);
        }
      } else if (data.user) {
        if (!data.session) {
          toast.success("Account created! Please check your email to confirm your account.");
          toast.info("After confirming, you can sign in with your credentials.");
        } else {
          console.log('Sign up successful with immediate session:', data.user.email);
          toast.success('Account created successfully!');
          // Use React Router navigation instead of forced reload
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Unexpected error during sign up:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    console.log('Demo login clicked');
    setLoading(true);
    
    try {
      // Clean up any existing auth state
      cleanupAuthState();
      
      // Create demo session
      createDemoSession();
      
      toast.success('Welcome to the demo!');
      // Use React Router navigation instead of forced reload
      navigate('/dashboard');
    } catch (error) {
      console.error('Demo login error:', error);
      toast.error('Failed to start demo session');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    console.log('Back to Home clicked - navigating to home page');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center app-gradient-bg p-4 relative">
      {/* Back to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className="text-white hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-all duration-200"
          type="button"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
             <Rocket className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in or create an account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin" disabled={loading}>Sign In</TabsTrigger>
              <TabsTrigger value="signup" disabled={loading}>Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 pt-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="py-6"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="py-6"
                />
                <Button type="submit" className="w-full py-6 font-semibold" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleDemoLogin}
                  disabled={loading}
                  className="w-full py-6 font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Starting Demo...
                    </>
                  ) : (
                    'Try Demo (No Account Needed)'
                  )}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 pt-4">
                <Input
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={loading}
                  className="py-6"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="py-6"
                />
                <Input
                  type="password"
                  placeholder="Password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={loading}
                  className="py-6"
                />
                <Button type="submit" className="w-full py-6 font-semibold" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
