
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { PromptGenerator } from "@/components/PromptGenerator";
import { ScenarioBank } from "@/components/ScenarioBank";
import { LightningQuestions } from "@/components/LightningQuestions";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FeaturesShowcase } from "@/components/sections/FeaturesShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { PricingSection } from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Zap, Target, TrendingUp, Users, Rocket } from "lucide-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {!isLoggedIn ? (
        <>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2">
                  🚀 AI-Powered Hiring for Startups
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                  Hire Rockstar Talent{" "}
                  <span className="text-blue-600">10x Faster</span>
                </h1>
                
                <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                  The ultimate AI-driven hiring platform for incubator startups. 
                  Uncover world-class generalists and tech specialists with precision and speed.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                    Watch Demo
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                  <span>✓ No credit card required</span>
                  <span>✓ 5-minute setup</span>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-16 bg-white/80 backdrop-blur border-t border-b border-gray-200">
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-800">6 Weeks to Fill</div>
                    <div className="text-sm text-slate-600">Average time to hire, hurting precious velocity</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">30% Salary Cost</div>
                    <div className="text-sm text-slate-600">Replacement cost for every bad hire</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">6 Months Ramp</div>
                    <div className="text-sm text-slate-600">Time for new hires to reach full productivity</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">240% Better Performance</div>
                    <div className="text-sm text-slate-600">with our Tech Screening</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FeaturesShowcase />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
        </>
      ) : (
        <>
          {/* App Content */}
          <div className="container mx-auto px-4 py-8">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "dashboard" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("hiring-center")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "hiring-center" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Hiring Center
                </button>
              </div>
            </div>

            {activeTab === "dashboard" ? (
              <Dashboard />
            ) : (
              <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-4 text-slate-800">Your Hiring Command Center</h2>
                  <p className="text-lg text-slate-600">Generate, customize, and export professional hiring materials with AI</p>
                </div>
                
                <PromptGenerator />
                <ScenarioBank />
                <LightningQuestions />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
