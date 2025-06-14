
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Stop Missing Your Next Game-Changing Hire
          </h2>
          <p className="text-xl sm:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
            Every week that passes without this system is a week your startup might miss that 
            perfect candidate. The competition for top talent is fierce. Give yourself the unfair advantage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
              Start Your Free Trial
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-6 text-lg font-semibold rounded-lg transition-all bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100 pt-8">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-lg">
              <span>No credit card required</span>
              <span className="hidden sm:inline">•</span>
              <span>14-day free trial</span>
              <span className="hidden sm:inline">•</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
