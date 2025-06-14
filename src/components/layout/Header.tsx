
import { Button } from "@/components/ui/button";
import { Sparkles, BarChart3, FileText, Users } from "lucide-react";
import { AuthSection } from "@/components/auth/AuthSection";

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export const Header = ({ isLoggedIn, setIsLoggedIn }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Hiring Powerhouse</span>
            </div>
            
            {isLoggedIn && (
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Hiring Center
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Templates
                </Button>
              </nav>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {!isLoggedIn && (
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost">Features</Button>
                <Button variant="ghost">How It Works</Button>
                <Button variant="ghost">Pricing</Button>
              </nav>
            )}
            <AuthSection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </div>
        </div>
      </div>
    </header>
  );
};
