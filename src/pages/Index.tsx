
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, Users, Clock, CheckCircle, ArrowRight, Crown, FileText, Sparkles } from "lucide-react";
import { PromptGenerator } from "@/components/PromptGenerator";
import { ScenarioBank } from "@/components/ScenarioBank";
import { LightningQuestions } from "@/components/LightningQuestions";
import { AuthSection } from "@/components/auth/AuthSection";
import { PricingSection } from "@/components/PricingSection";
import { useState } from "react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-800">HirePower AI</h1>
          </div>
          <AuthSection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      </header>

      {!isLoggedIn ? (
        <>
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                AI-Powered Hiring System
              </Badge>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Hiring Powerhouse
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                The ultimate AI-driven hiring guide for tech startups. Generate professional hiring documents, interview questions, and evaluation rubrics with AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  View Features
                </Button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle>AI Document Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Generate professional PDFs with interview guides, competency matrices, and evaluation rubrics.</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle>Smart Question Bank</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Access curated scenario questions and lightning rounds tailored to your startup needs.</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <CardTitle>Evaluation Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Objective scoring rubrics and candidate comparison tools powered by AI insights.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <PricingSection />
        </>
      ) : (
        <>
          {/* App Dashboard */}
          <section className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto space-y-16">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4 text-slate-800">Your Hiring Command Center</h2>
                <p className="text-lg text-slate-600">Generate, customize, and export professional hiring materials with AI</p>
              </div>
              
              <PromptGenerator />
              <ScenarioBank />
              <LightningQuestions />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Index;
