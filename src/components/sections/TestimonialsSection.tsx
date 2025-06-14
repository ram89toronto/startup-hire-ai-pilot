
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Founder, TechFlow AI",
      content: "We went from 5 weeks to hire to 10 days. The AI prompts helped us identify red flags we would have missed and find our perfect CTO.",
      rating: 5,
      avatar: "AC"
    },
    {
      name: "Sarah Rodriguez",
      role: "Co-Founder, DataSync",
      content: "The competency matrix generator is genius. It eliminated bias and helped us build a diverse, high-performing team of 15 in just 3 months.",
      rating: 5,
      avatar: "SR"
    },
    {
      name: "Marcus Johnson",
      role: "CEO, RocketTech Pro",
      content: "As a non-technical founder, I was terrified of hiring engineers. This platform gave me the confidence and tools to build an amazing tech team.",
      rating: 5,
      avatar: "MJ"
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Trusted by High-Growth Startups</h2>
          <p className="text-lg text-slate-600">See how founders are transforming their hiring process</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
