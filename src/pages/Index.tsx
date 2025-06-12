
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, Users, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { PromptGenerator } from "@/components/PromptGenerator";
import { ScenarioBank } from "@/components/ScenarioBank";
import { LightningQuestions } from "@/components/LightningQuestions";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
            The ultimate AI-driven hiring guide for tech startups. Uncover <strong>rockstar generalists</strong> and <strong>world-class tech specialists</strong> with precision and speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              View Demo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">230%</div>
            <div className="text-slate-600">Better performance with right tech leadership</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">6 weeks</div>
            <div className="text-slate-600">Average time to fill a role</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
            <div className="text-slate-600">Of salary lost on bad hires</div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            The Incubator Hiring Challenge
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Users className="h-6 w-6" />
                  Generalist Founders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700">
                  The scrappy "do-it-all" hustlers who wear 10 hats and pivot on a dime. 
                  Swiss-army-knife versatility for chaos and rapid growth.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Zap className="h-6 w-6" />
                  Specialist Tech-Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700">
                  Technical powerhouses (CTOs, lead engineers) who build scalable products 
                  and teams. Deep expertise with execution chops.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5-Phase Process */}
      <section className="container mx-auto px-4 py-16 bg-white/60 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            5-Phase AI-Powered Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { phase: "T-24 Hours", title: "Prep Master", icon: Target, desc: "Comprehensive preparation with AI-generated competency matrices" },
              { phase: "T-1 Hour", title: "Insight Excavator", icon: Clock, desc: "Last-minute intel to uncover hidden insights and red flags" },
              { phase: "T-5 Minutes", title: "Sniper Shots", icon: Zap, desc: "High-impact questions that pack a punch" },
              { phase: "Live", title: "Thread Puller", icon: Users, desc: "Dynamic follow-ups during the interview" },
              { phase: "Post", title: "Clarity Canvas", icon: CheckCircle, desc: "AI-powered evaluation and decision clarity" }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="mx-auto mb-2">{item.phase}</Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          <PromptGenerator />
          <ScenarioBank />
          <LightningQuestions />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            Turn Hiring Into Your Superpower
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Stop fumbling with intuition and generic questions. Start hiring A-players consistently.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg">
            Start Hiring Smarter Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
