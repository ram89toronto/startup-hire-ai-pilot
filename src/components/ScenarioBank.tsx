
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, DollarSign, Users, Code, BarChart3, Shield } from "lucide-react";

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

export const ScenarioBank = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">🚀 Scenario Bank</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Real startup challenges to test your candidates. Battle-tested scenarios that expose 
          how candidates handle high-stakes situations.
        </p>
      </div>

      <div className="grid gap-6">
        {scenarios.map((scenario, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <scenario.icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{scenario.title}</CardTitle>
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
