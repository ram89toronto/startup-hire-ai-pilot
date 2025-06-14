
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
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Your Unfair Advantage in Startup Hiring</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Transform hiring from gut-feel to data-driven science with our AI-powered platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`hover:shadow-lg transition-all border-2 ${getFeatureColors(feature.color)}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFeatureColors(feature.color)}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-slate-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{item}</span>
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
