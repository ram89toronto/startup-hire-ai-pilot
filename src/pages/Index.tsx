
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
import { ArrowRight, CheckCircle, Play, Star, Zap, Users, TrendingUp, Clock, Shield, Target, Rocket, Award, Building } from "lucide-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {!isLoggedIn ? (
        <div className="w-full">
          {/* Enhanced Hero Section */}
          <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-25"></div>
            
            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto text-center">
                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center items-center gap-8 mb-10 text-sm text-slate-600">
                  <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                    <div className="flex -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-blue-400 text-blue-400" />
                      ))}
                    </div>
                    <span className="font-medium">4.9/5 from 2,000+ startups</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">50,000+ successful hires</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">10x faster hiring</span>
                  </div>
                </div>

                <Badge className="inline-flex items-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-6 py-3 text-base font-medium rounded-full border-0 shadow-lg">
                  <Zap className="h-5 w-5 mr-2" />
                  AI-Powered Hiring Revolution
                </Badge>
                
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-[0.9] text-gray-900">
                  Find Your Next{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                    Rockstar Hire
                  </span>
                  <br />
                  <span className="text-3xl sm:text-4xl lg:text-6xl text-slate-700 font-normal">in Days, Not Months</span>
                </h1>
                
                <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto">
                  The world's first AI hiring platform built specifically for fast-growing startups. 
                  <br className="hidden lg:block" />
                  <span className="text-blue-600 font-semibold">Stop losing top talent to slow, broken hiring processes.</span>
                </p>

                {/* Enhanced Key Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                  <div className="flex items-center gap-3 text-slate-700 bg-white/70 px-6 py-4 rounded-xl shadow-sm">
                    <Clock className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold">10x faster hiring</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 bg-white/70 px-6 py-4 rounded-xl shadow-sm">
                    <Shield className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold">90% less bias</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 bg-white/70 px-6 py-4 rounded-xl shadow-sm">
                    <Target className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold">5x better quality</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-8 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Start Hiring Smarter Today
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-600 hover:text-blue-700 px-12 py-8 text-xl font-semibold rounded-2xl transition-all group bg-white/80"
                  >
                    <Play className="mr-3 h-6 w-6 group-hover:text-blue-600" />
                    Watch 2-Min Demo
                  </Button>
                </div>

                {/* Enhanced Social Proof */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-base text-slate-500">
                  <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Free 14-day trial</span>
                  </div>
                  <div className="hidden sm:block w-2 h-2 bg-slate-300 rounded-full"></div>
                  <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">No credit card needed</span>
                  </div>
                  <div className="hidden sm:block w-2 h-2 bg-slate-300 rounded-full"></div>
                  <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Logos Section */}
          <section className="py-16 bg-white border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="text-lg text-slate-600 mb-8">Trusted by high-growth startups worldwide</p>
                <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60">
                  {["TechFlow", "DataSync", "RocketTech", "ScaleUp", "GrowthCo", "StartupX"].map((company, index) => (
                    <div key={index} className="flex items-center gap-2 text-2xl font-bold text-slate-400">
                      <Building className="h-6 w-6" />
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Pain Points Section */}
          <section className="py-24 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                  Your Current Hiring Process is <span className="text-blue-400">Killing Your Startup</span>
                </h2>
                <p className="text-2xl text-blue-100 mb-16 leading-relaxed">Every day you wait is a day your competitors get ahead with better talent</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                  <div className="text-center space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-blue-500/20">
                    <div className="text-5xl font-bold text-blue-400">47%</div>
                    <div className="text-blue-100 text-lg leading-relaxed">of startups fail due to bad hires</div>
                  </div>
                  <div className="text-center space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-blue-500/20">
                    <div className="text-5xl font-bold text-blue-400">6 Weeks</div>
                    <div className="text-blue-100 text-lg leading-relaxed">average time to hire (killing velocity)</div>
                  </div>
                  <div className="text-center space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-blue-500/20">
                    <div className="text-5xl font-bold text-blue-400">$240K</div>
                    <div className="text-blue-100 text-lg leading-relaxed">cost of every bad hire</div>
                  </div>
                  <div className="text-center space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-blue-500/20">
                    <div className="text-5xl font-bold text-blue-400">89%</div>
                    <div className="text-blue-100 text-lg leading-relaxed">of founders hate their hiring process</div>
                  </div>
                </div>

                <div className="mt-16">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Fix Your Hiring Process Now
                    <Rocket className="ml-3 h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <FeaturesShowcase />
          <TestimonialsSection />
          
          {/* Success Stories Section */}
          <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-slate-800">Success Stories</h2>
              <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">See the real impact on startup growth</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                  <div className="text-4xl font-bold text-blue-600 mb-4">10 Days</div>
                  <div className="text-slate-600">TechFlow hired their CTO in just 10 days instead of 8 weeks</div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                  <div className="text-4xl font-bold text-indigo-600 mb-4">15 Hires</div>
                  <div className="text-slate-600">DataSync built their entire tech team in 3 months</div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                  <div className="text-4xl font-bold text-blue-700 mb-4">$2M Raised</div>
                  <div className="text-slate-600">RocketTech secured Series A with their new team</div>
                </div>
              </div>
            </div>
          </section>

          <PricingSection />
          <CTASection />
          <Footer />
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
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" 
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("hiring-center")}
                  className={`px-8 py-4 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "hiring-center" 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" 
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
