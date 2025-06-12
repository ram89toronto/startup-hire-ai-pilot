
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, TrendingUp, DollarSign, Users, Code, BarChart3, Shield, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const scenarios = [
  {
    title: "Pivot on a Dime",
    icon: Zap,
    category: "Adaptability",
    description: "Six months in, our product isn't finding traction. Users love one feature that's unrelated to our original idea. How would you approach a pivot in this situation?",
    tests: "adaptability and strategic thinking",
    lookFor: "Great for co-founders: have they pivoted or killed an idea before? Can they set aside ego for what the market tells them?"
  },
  {
    title: "Scaling Nightmare",
    icon: TrendingUp,
    category: "Technical",
    description: "Our app just went viral, and we have 10x users overnight – and the system is crashing. As our tech lead, what do you do in the next 48 hours?",
    tests: "technical fire-fighting, prioritization, and calm under pressure",
    lookFor: "The best answers might involve quick triage, scalable architecture fixes, and rallying a team to work round the clock."
  },
  {
    title: "Funding Crunch",
    icon: DollarSign,
    category: "Leadership",
    description: "We planned for a 12-month runway, but an investor backed out last minute. We now have 4 months of cash left. What steps would you take as a founder/exec?",
    tests: "resourcefulness, decisiveness, and resilience",
    lookFor: "A strong candidate might talk about aggressive cutbacks AND parallel fundraising or revenue-generating moves."
  },
  {
    title: "Team Culture Clash",
    icon: Users,
    category: "Leadership",
    description: "You discover that two of your early employees (say a brilliant engineer and a strong salesperson) are in a serious conflict that's hurting morale. How do you handle it?",
    tests: "leadership, emotional intelligence, and values",
    lookFor: "Look for approaches that reinforce culture and mediate fairly – startups can't afford toxic environments."
  },
  {
    title: "Technical Pitfall",
    icon: Code,
    category: "Technical",
    description: "Our product's core algorithm was working fine at 1,000 users, but at 100,000 users it's too slow and customers are churning. How would you lead a fix?",
    tests: "technical depth and problem-solving",
    lookFor: "Great tech leads will discuss diagnosing the bottleneck, perhaps redesigning the algorithm or scaling infrastructure."
  },
  {
    title: "Market Shift",
    icon: BarChart3,
    category: "Strategy",
    description: "A giant competitor just released a free version of our paid service. We have two weeks to respond or risk losing relevance – what's your move?",
    tests: "creativity, market savvy, and urgency",
    lookFor: "Strong answers might include quick marketing plays, doubling down on our differentiators, or even altering our pricing model."
  },
  {
    title: "Ethical Quandary",
    icon: Shield,
    category: "Values",
    description: "A potential client offers a $500k contract that would double our revenue, but they want us to implement a feature that conflicts with our core values. As a leader, what do you do?",
    tests: "integrity, long-term thinking, and backbone",
    lookFor: "This can expose whether they'll chase money at all costs or stand by principles – critical for founding team culture."
  }
];

const categoryColors = {
  "Adaptability": "bg-orange-100 text-orange-800",
  "Technical": "bg-blue-100 text-blue-800",
  "Leadership": "bg-purple-100 text-purple-800",
  "Strategy": "bg-green-100 text-green-800",
  "Values": "bg-red-100 text-red-800"
};

const categories = ["Adaptability", "Technical", "Leadership", "Strategy", "Values"];

export const ScenarioBank = () => {
  const [customTitle, setCustomTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScenarios, setGeneratedScenarios] = useState<any[]>([]);

  const generateRandomScenario = async (category?: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation (replace with actual AI integration)
    setTimeout(() => {
      const randomCategories = category ? [category] : categories;
      const randomCategory = randomCategories[Math.floor(Math.random() * randomCategories.length)];
      
      const newScenario = {
        title: `Generated ${randomCategory} Challenge`,
        icon: Code, // Default icon
        category: randomCategory,
        description: `This is a dynamically generated ${randomCategory.toLowerCase()} scenario for your interview process. The challenge tests critical skills in ${randomCategory.toLowerCase()} situations.`,
        tests: `${randomCategory.toLowerCase()} skills and decision-making`,
        lookFor: `Look for thoughtful analysis, practical solutions, and alignment with ${randomCategory.toLowerCase()} best practices.`,
        isGenerated: true
      };
      
      setGeneratedScenarios(prev => [newScenario, ...prev]);
      setIsGenerating(false);
      toast.success("New scenario generated successfully!");
    }, 2000);
  };

  const generateCustomScenario = async () => {
    if (!customTitle.trim()) {
      toast.error("Please enter a scenario title");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation with custom title
    setTimeout(() => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      const newScenario = {
        title: customTitle,
        icon: Sparkles,
        category: randomCategory,
        description: `Custom scenario: ${customTitle}. This scenario tests the candidate's ability to handle unique challenges specific to your startup's needs.`,
        tests: "creative problem-solving and adaptability",
        lookFor: "Look for innovative thinking, practical approach, and alignment with your specific requirements.",
        isGenerated: true
      };
      
      setGeneratedScenarios(prev => [newScenario, ...prev]);
      setCustomTitle("");
      setIsGenerating(false);
      toast.success("Custom scenario generated successfully!");
    }, 2000);
  };

  const allScenarios = [...generatedScenarios, ...scenarios];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">🚀 Scenario Bank</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Real startup challenges to test your candidates. Battle-tested scenarios that expose 
          how candidates handle high-stakes situations.
        </p>
      </div>

      {/* Scenario Generation Controls */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Generate New Scenarios
          </CardTitle>
          <CardDescription>
            Create custom scenarios or generate random ones by category
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Custom Title Generation */}
            <div className="space-y-3">
              <h4 className="font-medium text-slate-700">Custom Scenario</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter scenario title..."
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={generateCustomScenario}
                  disabled={isGenerating}
                  className="shrink-0"
                >
                  {isGenerating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  Generate
                </Button>
              </div>
            </div>

            {/* Random by Category */}
            <div className="space-y-3">
              <h4 className="font-medium text-slate-700">Random by Category</h4>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={() => generateRandomScenario(selectedCategory)}
                  disabled={isGenerating}
                  variant="outline"
                  className="shrink-0"
                >
                  {isGenerating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Random
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {allScenarios.map((scenario, index) => (
          <Card 
            key={index} 
            className={`hover:shadow-lg transition-all duration-300 ${
              scenario.isGenerated ? 'border-blue-200 bg-blue-50/30' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <scenario.icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {scenario.title}
                      {scenario.isGenerated && (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          AI Generated
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Tests: <strong>{scenario.tests}</strong>
                    </CardDescription>
                  </div>
                </div>
                <Badge className={categoryColors[scenario.category as keyof typeof categoryColors]}>
                  {scenario.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-300">
                <p className="text-slate-700 italic">"{scenario.description}"</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">What to Look For:</h4>
                <p className="text-blue-700 text-sm">{scenario.lookFor}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Pro Tip</h3>
            <p className="text-slate-600">
              Use these scenarios according to the role. Technical candidates should dig into <em>how</em> to execute the fix, 
              whereas founder-types should address <em>who</em> to involve and <em>how</em> to decide.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
