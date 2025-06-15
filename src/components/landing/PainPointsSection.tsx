
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export const PainPointsSection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                  Your Current Hiring Process is <span className="text-blue-400">Killing Your Startup</span>
                </h2>
                <p className="text-2xl text-blue-100 mb-16 leading-relaxed">Every day you wait is a day your competitors get ahead with better talent</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                  <div className="text-center space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-blue-500/20">
                    <div className="text-5xl font-bold text-blue-400">47%</div>
                    <div className="text-blue-100 text-lg leading-relaxed">of startups fail due to bad hires</div>
                  </div>
                  <div className="text-center space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-blue-500/20">
                    <div className="text-5xl font-bold text-blue-400">6 Weeks</div>
                    <div className="text-blue-100 text-lg leading-relaxed">average time to hire (killing velocity)</div>
                  </div>
                  <div className="text-center space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-blue-500/20">
                    <div className="text-5xl font-bold text-blue-400">$240K</div>
                    <div className="text-blue-100 text-lg leading-relaxed">cost of every bad hire</div>
                  </div>
                  <div className="text-center space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-blue-500/20">
                    <div className="text-5xl font-bold text-blue-400">89%</div>
                    <div className="text-blue-100 text-lg leading-relaxed">of founders hate their hiring process</div>
                  </div>
                </div>

                <div className="mt-16">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    onClick={() => navigate('/auth')}
                  >
                    Fix Your Hiring Process Now
                    <Rocket className="ml-3 h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
        </section>
    )
}
