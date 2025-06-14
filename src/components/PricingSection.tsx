
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown } from "lucide-react";

export const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "/month",
      description: "Perfect for trying out the platform",
      icon: Zap,
      features: [
        "10 free AI tokens",
        "Basic prompt generator",
        "Standard question bank",
        "PDF export (watermarked)",
        "Email support"
      ],
      cta: "Start Free Trial",
      popular: false,
      bgColor: "bg-white",
      borderColor: "border-gray-200",
      buttonStyle: "bg-slate-800 hover:bg-slate-900 text-white"
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Everything you need to scale your hiring",
      icon: Crown,
      features: [
        "Unlimited AI tokens",
        "Advanced prompt templates",
        "Full scenario bank access",
        "Custom PDF branding",
        "Priority support",
        "Candidate tracking",
        "Team collaboration",
        "Advanced analytics"
      ],
      cta: "Get Started",
      popular: true,
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      borderColor: "border-blue-500",
      buttonStyle: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Start free, upgrade when you're ready to scale your hiring
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-xl transition-all duration-300 ${plan.bgColor} ${
                  plan.popular 
                    ? `border-2 ${plan.borderColor} scale-105 shadow-lg` 
                    : `border ${plan.borderColor}`
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 text-sm font-medium">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-6 pt-10">
                  <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100' 
                      : 'bg-slate-100'
                  }`}>
                    <plan.icon className={`h-8 w-8 ${
                      plan.popular ? 'text-blue-600' : 'text-slate-600'
                    }`} />
                  </div>
                  
                  <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
                    {plan.name}
                  </CardTitle>
                  
                  <CardDescription className="text-base text-slate-600 mb-6">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-slate-800">{plan.price}</span>
                      <span className="text-xl text-slate-600 ml-1">{plan.period}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-8 pb-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 ${plan.buttonStyle}`}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 text-lg">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
