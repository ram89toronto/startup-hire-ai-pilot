
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, FileText, Users, BarChart3, Zap, Shield, Check } from "lucide-react";

export const FeaturesShowcase = () => {
  const features = [
    {
      icon: Wand2,
      title: "Mega Prompt Generator",
      description: "A single copy-paste prompt that auto-creates competency matrices, realistic scenario questions, and objective evaluation rubrics for any role.",
      features: [
        "Competency matrices for any role",
        "Scenario-based questions",
        "Objective evaluation rubrics"
      ],
      color: "blue"
    },
    {
      icon: FileText,
      title: "5-Phase Interview System",
      description: "Proven time-tested prompt packs that guide you from 24 hours before to post-interview analysis.",
      features: [
        "T-24 Hours: Prep Master",
        "Live Interview: Thread Puller",
        "Post-interview: Clarity Canvas"
      ],
      color: "purple"
    },
    {
      icon: Users,
      title: "Dual-Track Hiring",
      description: "Specialized workflows for both scrappy generalist founders and technical powerhouse specialists.",
      features: [
        "Generalist founder templates",
        "Tech specialist assessments",
        "Role-specific competencies"
      ],
      color: "green"
    },
    {
      icon: Zap,
      title: "Scenario Challenge Bank",
      description: "Real-world startup scenarios to stress-test candidates' skills and temperament under pressure.",
      features: [
        "Pivot scenarios",
        "Scaling challenges",
        "Crisis management"
      ],
      color: "orange"
    },
    {
      icon: BarChart3,
      title: "Lightning Question Sets",
      description: "20+ rapid-fire questions to expose founder mindset, execution grit, AI savvy, and leadership clarity.",
      features: [
        "Founder mindset probes",
        "Execution assessment",
        "Leadership evaluation"
      ],
      color: "pink"
    },
    {
      icon: Shield,
      title: "Pipeline Management",
      description: "Complete hiring pipeline with templates, scheduling, evaluation tools, and performance analytics.",
      features: [
        "Interview scheduling",
        "Candidate tracking",
        "Analytics dashboard"
      ],
      color: "indigo"
    }
  ];

  const getFeatureColors = (color: string) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200 text-blue-600",
      purple: "bg-purple-50 border-purple-200 text-purple-600",
      green: "bg-green-50 border-green-200 text-green-600",
      orange: "bg-orange-50 border-orange-200 text-orange-600",
      pink: "bg-pink-50 border-pink-200 text-pink-600",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-600"
    };
    return colors[color as keyof typeof colors] || "bg-gray-50 border-gray-200 text-gray-600";
  };

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">Your Unfair Advantage in Startup Hiring</h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Transform hiring from gut-feel to data-driven science with our AI-powered platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className={`hover:shadow-xl transition-all duration-300 border-2 h-full ${getFeatureColors(feature.color)} hover:scale-105`}>
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getFeatureColors(feature.color)}`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                </div>
                <CardTitle className="text-xl lg:text-2xl mb-3 text-slate-800">{feature.title}</CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm lg:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
