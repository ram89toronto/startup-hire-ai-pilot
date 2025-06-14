
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
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {!isLoggedIn ? (
        <div className="w-full">
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <Badge className="inline-flex items-center mb-8 bg-blue-100 text-blue-800 hover:bg-blue-200 px-6 py-3 text-sm font-medium rounded-full">
                  🚀 AI-Powered Hiring for Startups
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-gray-900">
                  Hire Rockstar Talent{" "}
                  <span className="text-blue-600">10x Faster</span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                  The ultimate AI-driven hiring platform for incubator startups. 
                  Uncover world-class generalists and tech specialists with precision and speed.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 px-10 py-6 text-lg font-semibold rounded-lg transition-all"
                  >
                    Watch Demo
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>5-minute setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>14-day free trial</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="bg-white border-t border-b border-gray-200 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div className="text-center space-y-4">
                  <div className="text-3xl lg:text-4xl font-bold text-slate-800">6 Weeks</div>
                  <div className="text-sm lg:text-base text-slate-600 leading-relaxed">Average time to hire, hurting precious velocity</div>
                </div>
                <div className="text-center space-y-4">
                  <div className="text-3xl lg:text-4xl font-bold text-slate-800">30%</div>
                  <div className="text-sm lg:text-base text-slate-600 leading-relaxed">Salary cost for every bad hire replacement</div>
                </div>
                <div className="text-center space-y-4">
                  <div className="text-3xl lg:text-4xl font-bold text-slate-800">6 Months</div>
                  <div className="text-sm lg:text-base text-slate-600 leading-relaxed">Time for new hires to reach full productivity</div>
                </div>
                <div className="text-center space-y-4">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600">240%</div>
                  <div className="text-sm lg:text-base text-slate-600 leading-relaxed">Better performance with our Tech Screening</div>
                </div>
              </div>
            </div>
          </section>

          <FeaturesShowcase />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
        </div>
      ) : (
        <div className="min-h-screen bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="flex bg-white rounded-xl p-2 shadow-sm border">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-8 py-4 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "dashboard" 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("hiring-center")}
                  className={`px-8 py-4 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "hiring-center" 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Hiring Center
                </button>
              </div>
            </div>

            {activeTab === "dashboard" ? (
              <Dashboard />
            ) : (
              <div className="max-w-7xl mx-auto space-y-20">
                <div className="text-center space-y-6">
                  <h2 className="text-4xl sm:text-5xl font-bold text-slate-800">Your Hiring Command Center</h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">Generate, customize, and export professional hiring materials with AI</p>
                </div>
                
                <PromptGenerator />
                <ScenarioBank />
                <LightningQuestions />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
