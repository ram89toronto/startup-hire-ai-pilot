import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { PasswordReset } from "./PasswordReset";
import { UserProfile } from "./UserProfile";
import { useTokens } from "@/hooks/useTokens";

interface AuthSectionProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export const AuthSection = ({ isLoggedIn, setIsLoggedIn }: AuthSectionProps) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const { getRemainingTokens, tokens } = useTokens();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [setIsLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setIsAuthOpen(false);
      toast.success("Welcome back!");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      options: {
        data: {
          full_name: signupData.name,
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data.user) {
      toast.success("Account created! Please check your email to confirm.");
      toast.info("For easier testing, you can disable email confirmation in your Supabase project's auth settings.");
    }
    setIsAuthOpen(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
    }
  };

  if (isLoggedIn) {
    const remainingTokens = getRemainingTokens();
    return (
      <>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border">
            <span className="text-sm font-medium">
              {remainingTokens === Infinity ? "Unlimited" : `${remainingTokens} tokens left`}
            </span>
            {tokens.planType === 'free' && (
              <Button size="sm" variant="outline">Upgrade</Button>
            )}
          </div>
          <Button variant="ghost" onClick={() => setShowUserProfile(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        
        <UserProfile 
          isOpen={showUserProfile} 
          onClose={() => setShowUserProfile(false)} 
        />
      </>
    );
  }

  return (
    <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <User className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Started</DialogTitle>
        </DialogHeader>
        
        {showPasswordReset ? (
          <PasswordReset onBack={() => setShowPasswordReset(false)} />
        ) : (
          <>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Sign in to access your hiring tools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">Sign In</Button>
                      <Button 
                        type="button" 
                        variant="link" 
                        className="w-full text-sm"
                        onClick={() => setShowPasswordReset(true)}
                      >
                        Forgot your password?
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>Get 10 free tokens to start hiring smarter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={signupData.name}
                          onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          value={signupData.password}
                          onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">Create Account</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <GoogleAuthButton />
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setIsLoggedIn(true);
                  setIsAuthOpen(false);
                  toast.success("Logged in as Demo User!");
                }}
              >
                Continue as Demo User
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
