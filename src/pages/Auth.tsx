
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
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signed in successfully!');
      navigate('/');
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    if (error) {
      toast.error(error.message);
    } else if (data.user && !data.session) {
      toast.info("This email is already registered. Please check your email for the confirmation link or sign in.");
    }
    else {
      toast.success('Check your email for the confirmation link!');
    }
    setLoading(false);
  };

  const handleBackToHome = () => {
    console.log('=== Back to Home Debug ===');
    console.log('Current pathname:', window.location.pathname);
    console.log('Current href:', window.location.href);
    console.log('Navigate function:', typeof navigate);
    
    try {
      console.log('Attempting navigate("/")...');
      navigate('/');
      console.log('Navigate call completed');
      
      // Add a small delay to check if navigation worked
      setTimeout(() => {
        console.log('After navigation - pathname:', window.location.pathname);
        if (window.location.pathname === '/auth') {
          console.log('Navigation failed - still on auth page');
          console.log('Trying window.location.href as fallback');
          window.location.href = '/';
        }
      }, 100);
      
    } catch (error) {
      console.error('Navigation error:', error);
      console.log('Using window.location.href fallback');
      window.location.href = '/';
    }
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

      {/* Emergency direct link for testing */}
      <div className="fixed top-16 left-4 z-50">
        <a 
          href="/" 
          className="text-white/60 hover:text-white text-xs underline bg-black/20 px-2 py-1 rounded"
          onClick={() => console.log('Direct link clicked')}
        >
          Direct Home Link
        </a>
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
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="py-6"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="py-6"
                />
                <Button type="submit" className="w-full py-6 font-semibold" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
