
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket } from "lucide-react";

export const PricingSection = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "/month",
      description: "Perfect for trying out the platform",
      icon: Zap,
      features: [
        "10 free AI tokens",
        "Basic prompt generator",
        "Standard question bank",
        "PDF export (watermarked)"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Ideal for growing startups",
      icon: Crown,
      features: [
        "500 AI tokens/month",
        "Advanced prompt templates",
        "Full scenario bank access",
        "Custom PDF branding",
        "Email support",
        "Candidate tracking"
      ],
      cta: "Upgrade to Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For scaling organizations",
      icon: Rocket,
      features: [
        "Unlimited AI tokens",
        "Custom integrations",
        "White-label solutions",
        "Priority support",
        "Team collaboration",
        "Advanced analytics"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">Choose Your Plan</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Start with our free trial, then upgrade as your hiring needs grow
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative hover:shadow-lg transition-all ${plan.popular ? 'border-2 border-blue-500 scale-105' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Most Popular
              </Badge>
            )}
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <plan.icon className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold text-slate-800">{plan.price}</span>
                <span className="text-slate-600">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}>
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
