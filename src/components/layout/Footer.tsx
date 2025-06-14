
import { Link } from "react-router-dom";
import { Shield, Lock, Award, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">HireSmart AI</h3>
              <p className="text-slate-300 leading-relaxed">
                The world's first AI hiring platform built specifically for fast-growing startups. 
                Transform your hiring process today.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Shield className="h-4 w-4 text-green-400" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Lock className="h-4 w-4 text-green-400" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#integrations" className="text-slate-300 hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#api" className="text-slate-300 hover:text-white transition-colors">API</a></li>
              <li><a href="#security" className="text-slate-300 hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#blog" className="text-slate-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#help" className="text-slate-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#guides" className="text-slate-300 hover:text-white transition-colors">Hiring Guides</a></li>
              <li><a href="#webinars" className="text-slate-300 hover:text-white transition-colors">Webinars</a></li>
              <li><a href="#community" className="text-slate-300 hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Legal & Support</h4>
            <ul className="space-y-4">
              <li><Link to="/terms" className="text-slate-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><a href="#cookies" className="text-slate-300 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#status" className="text-slate-300 hover:text-white transition-colors">Service Status</a></li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Award className="h-5 w-5 text-blue-400" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Globe className="h-5 w-5 text-green-400" />
                <span>99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Shield className="h-5 w-5 text-purple-400" />
                <span>Enterprise Grade Security</span>
              </div>
            </div>
            
            <div className="text-sm text-slate-400">
              © 2024 HireSmart AI. All rights reserved.
            </div>
          </div>
        </div>

        {/* Additional Trust Information */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="text-center">
            <p className="text-xs text-slate-500 leading-relaxed max-w-4xl mx-auto">
              HireSmart AI is committed to equal opportunity hiring and fair recruitment practices. 
              Our AI algorithms are regularly audited for bias and comply with employment laws. 
              Trusted by 2,000+ startups worldwide for fair, efficient, and effective hiring.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
