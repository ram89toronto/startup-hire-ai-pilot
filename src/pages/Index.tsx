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
import { ArrowRight, CheckCircle, Play, Star, Zap, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {!isLoggedIn ? (
        <div className="w-full">
          {/* Enhanced Hero Section */}
          <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-25"></div>
            
            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span>4.9/5 from 2,000+ startups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>50,000+ hires made</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>10x faster hiring</span>
                  </div>
                </div>

                <Badge className="inline-flex items-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-4 py-2 text-sm font-medium rounded-full border-0">
                  <Zap className="h-4 w-4 mr-2" />
                  AI-Powered Hiring Revolution
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900">
                  Find Your Next{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Rockstar Hire
                  </span>
                  <br />
                  <span className="text-3xl sm:text-4xl lg:text-5xl text-slate-700">in 10 Days, Not 10 Weeks</span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                  The world's first AI hiring platform built specifically for fast-growing startups. 
                  Stop losing top talent to slow, broken hiring processes.
                </p>

                {/* Key Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">10x faster hiring</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">90% less bias</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">5x better quality</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Start Hiring Smarter Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-xl transition-all group"
                  >
                    <Play className="mr-2 h-5 w-5 group-hover:text-blue-600" />
                    Watch 2-Min Demo
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>No credit card needed</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pain Points Section */}
          <section className="py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Your Current Hiring Process is <span className="text-red-400">Killing Your Startup</span>
                </h2>
                <p className="text-xl text-slate-300 mb-12">Every day you wait is a day your competitors get ahead</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-red-400">47%</div>
                    <div className="text-slate-300">of startups fail due to bad hires</div>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-red-400">6 Weeks</div>
                    <div className="text-slate-300">average time to hire (killing velocity)</div>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-red-400">$240K</div>
                    <div className="text-slate-300">cost of every bad hire</div>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-red-400">89%</div>
                    <div className="text-slate-300">of founders hate their hiring process</div>
                  </div>
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
