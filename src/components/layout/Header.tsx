
import { Button } from "@/components/ui/button";
import { Sparkles, BarChart3, FileText, Users, Menu, X } from "lucide-react";
import { AuthSection } from "@/components/auth/AuthSection";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export const Header = ({ isLoggedIn, setIsLoggedIn }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Hiring Powerhouse</span>
            </div>
            
            {isLoggedIn && (
              <nav className="hidden lg:flex items-center gap-6">
                <Button variant="ghost" className="flex items-center gap-2 hover:text-blue-600">
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="flex items-center gap-2 hover:text-blue-600">
                  <Sparkles className="h-4 w-4" />
                  Hiring Center
                </Button>
                <Button variant="ghost" className="flex items-center gap-2 hover:text-blue-600">
                  <FileText className="h-4 w-4" />
                  Templates
                </Button>
              </nav>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {!isLoggedIn && (
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost" className="hover:text-blue-600">Features</Button>
                <Button variant="ghost" className="hover:text-blue-600">How It Works</Button>
                <Button variant="ghost" className="hover:text-blue-600">Pricing</Button>
              </nav>
            )}
            
            <div className="hidden sm:block">
              <AuthSection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t bg-white py-4 space-y-2">
            {!isLoggedIn ? (
              <>
                <Button variant="ghost" className="w-full justify-start hover:text-blue-600">Features</Button>
                <Button variant="ghost" className="w-full justify-start hover:text-blue-600">How It Works</Button>
                <Button variant="ghost" className="w-full justify-start hover:text-blue-600">Pricing</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="w-full justify-start hover:text-blue-600">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start hover:text-blue-600">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Hiring Center
                </Button>
                <Button variant="ghost" className="w-full justify-start hover:text-blue-600">
                  <FileText className="h-4 w-4 mr-2" />
                  Templates
                </Button>
              </>
            )}
            <div className="pt-2">
              <AuthSection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
