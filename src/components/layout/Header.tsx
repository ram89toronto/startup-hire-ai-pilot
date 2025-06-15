
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthSection } from "@/components/auth/AuthSection";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MessageSquare, BarChart3, Settings, Menu, X } from "lucide-react";

interface HeaderProps {
  activeView: "dashboard" | "prompt-generator" | "analytics" | "settings";
  setActiveView: (view: "dashboard" | "prompt-generator" | "analytics" | "settings") => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export const Header = ({ activeView, setActiveView, isLoggedIn, setIsLoggedIn }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "prompt-generator", label: "Interview Kit", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              HireGuide AI
            </h1>
          </div>

          {/* Desktop Navigation */}
          {isLoggedIn && (
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    onClick={() => setActiveView(item.id as any)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AuthSection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            
            {/* Mobile menu button */}
            {isLoggedIn && (
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isLoggedIn && isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-3">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    onClick={() => {
                      setActiveView(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
