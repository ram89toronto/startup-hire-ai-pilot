
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Privacy Policy</h1>
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p><strong>Account Information:</strong> Name, email address, company information</p>
                <p><strong>Usage Data:</strong> How you use our platform, features accessed, time spent</p>
                <p><strong>Hiring Data:</strong> Job descriptions, candidate assessments, interview notes (stored securely)</p>
                <p><strong>Technical Data:</strong> IP address, browser type, device information</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve our hiring platform services</li>
                  <li>Generate AI-powered hiring content and recommendations</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Send important service updates and support communications</li>
                  <li>Analyze platform usage to enhance user experience</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Data Security</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>We implement industry-standard security measures to protect your data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>End-to-end encryption for sensitive data</li>
                  <li>SOC 2 Type II compliance</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Secure cloud infrastructure with automatic backups</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Data Sharing</h2>
              <p className="text-slate-600 leading-relaxed">
                We do not sell or rent your personal information. We may share data only in limited circumstances: with your consent, to comply with legal obligations, or with trusted service providers under strict confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Your Rights</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt out of non-essential communications</li>
                  <li>Request data processing restrictions</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Contact Us</h2>
              <div className="bg-slate-50 p-6 rounded-lg">
                <p className="text-slate-600 leading-relaxed">
                  For privacy-related questions or requests:
                  <br />
                  <strong>Email:</strong> privacy@yourstartup.com
                  <br />
                  <strong>Data Protection Officer:</strong> dpo@yourstartup.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
