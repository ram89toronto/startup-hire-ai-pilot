
export const SuccessStoriesSection = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-slate-800">Success Stories</h2>
              <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">See the real impact on startup growth</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                  <div className="text-4xl font-bold text-blue-600 mb-4">10 Days</div>
                  <div className="text-slate-600">TechFlow hired their CTO in just 10 days instead of 8 weeks</div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                  <div className="text-4xl font-bold text-indigo-600 mb-4">15 Hires</div>
                  <div className="text-slate-600">DataSync built their entire tech team in 3 months</div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                  <div className="text-4xl font-bold text-blue-700 mb-4">$2M Raised</div>
                  <div className="text-slate-600">RocketTech secured Series A with their new team</div>
                </div>
              </div>
            </div>
        </section>
    )
}
