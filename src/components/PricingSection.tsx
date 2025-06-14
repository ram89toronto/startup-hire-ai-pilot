
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
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">Choose Your Plan</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Start with our free trial, then upgrade as your hiring needs grow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 h-full ${plan.popular ? 'border-2 border-blue-500 scale-105 shadow-lg' : 'border border-gray-200'}`}>
              {plan.popular && (
                <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 text-sm font-medium">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-6 pt-8">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <plan.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-slate-800">{plan.name}</CardTitle>
                <CardDescription className="mb-6 text-base text-slate-600">{plan.description}</CardDescription>
                <div className="space-y-2">
                  <span className="text-5xl lg:text-6xl font-bold text-slate-800">{plan.price}</span>
                  <span className="text-xl text-slate-600">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col h-full px-8 pb-8">
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-slate-600 text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full py-4 text-lg font-semibold rounded-lg ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}>
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
