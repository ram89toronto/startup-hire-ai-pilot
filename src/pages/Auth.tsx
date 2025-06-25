
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { Rocket, ArrowLeft } from 'lucide-react';

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
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password 
      });
      
      console.log('Sign in response:', { data, error });
      
      if (error) {
        console.error('Sign in error:', error);
        toast.error(error.message);
      } else if (data.user) {
        console.log('Sign in successful, user:', data.user.email);
        toast.success('Signed in successfully!');
        // Force navigation to dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('Unexpected error during sign in:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up attempt with email:', email);
    setLoading(true);
    
    try {
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
        toast.error(error.message);
      } else if (data.user && !data.session) {
        toast.info("Please check your email for the confirmation link!");
      } else if (data.user && data.session) {
        console.log('Sign up successful with session, user:', data.user.email);
        toast.success('Account created successfully!');
        // Force navigation to dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('Unexpected error during sign up:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    console.log('Demo login clicked');
    toast.success('Demo login successful!');
    // Force navigation to dashboard as demo user
    window.location.href = '/dashboard';
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
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 pt-4">
                <Input
                  type="email"
                  placeholder="Email (try: demo@example.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="py-6"
                />
                <Input
                  type="password"
                  placeholder="Password (try: demo123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="py-6"
                />
                <Button type="submit" className="w-full py-6 font-semibold" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
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
                  className="w-full py-6 font-semibold"
                >
                  Continue as Demo User
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
                  className="py-6"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="py-6"
                />
                <Input
                  type="password"
                  placeholder="Password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="py-6"
                />
                <Button type="submit" className="w-full py-6 font-semibold" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
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
