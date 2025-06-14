
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
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
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Terms & Conditions</h1>
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing and using our AI-powered hiring platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Service Description</h2>
              <p className="text-slate-600 leading-relaxed">
                Our platform provides AI-powered hiring tools including prompt generation, competency matrices, scenario-based assessments, and interview management systems designed specifically for startups and growing companies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. User Accounts</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                <p>You are responsible for safeguarding the password and for keeping your account information current.</p>
                <p>You agree not to disclose your password to any third party and to take sole responsibility for activities that occur under your account.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Subscription and Billing</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p><strong>Free Trial:</strong> We offer a 14-day free trial for new users. No credit card required for trial access.</p>
                <p><strong>Paid Subscriptions:</strong> After the trial period, continued access requires a paid subscription.</p>
                <p><strong>Billing:</strong> Subscription fees are billed monthly or annually in advance. All fees are non-refundable except as required by law.</p>
                <p><strong>Cancellation:</strong> You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Acceptable Use</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Generate discriminatory or biased hiring content</li>
                  <li>Upload malicious code or viruses</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Data and Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Intellectual Property</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>The Service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
                <p>You retain ownership of content you create using our platform, but grant us a license to process and improve our services.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. Contact Information</h2>
              <div className="bg-slate-50 p-6 rounded-lg">
                <p className="text-slate-600 leading-relaxed">
                  If you have any questions about these Terms & Conditions, please contact us at:
                  <br />
                  <strong>Email:</strong> legal@yourstartup.com
                  <br />
                  <strong>Address:</strong> 123 Startup Ave, Tech City, TC 12345
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
