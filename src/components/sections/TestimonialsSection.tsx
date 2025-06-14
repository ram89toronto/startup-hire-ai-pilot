
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
    <section className="py-20 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">Trusted by High-Growth Startups</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">See how founders are transforming their hiring process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 bg-white h-full border-0 shadow-lg">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-8 italic flex-1 leading-relaxed text-lg">"{testimonial.content}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-lg">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-slate-800 text-lg">{testimonial.name}</div>
                    <div className="text-slate-600">{testimonial.role}</div>
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
