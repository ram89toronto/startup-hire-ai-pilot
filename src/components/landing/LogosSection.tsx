
import { Building } from "lucide-react";

export const LogosSection = () => {
    return (
        <section className="py-16 bg-white border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="text-lg text-slate-600 mb-8">Trusted by high-growth startups worldwide</p>
                <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60">
                  {["TechFlow", "DataSync", "RocketTech", "ScaleUp", "GrowthCo", "StartupX"].map((company, index) => (
                    <div key={index} className="flex items-center gap-2 text-2xl font-bold text-slate-400">
                      <Building className="h-6 w-6" />
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </section>
    )
}
