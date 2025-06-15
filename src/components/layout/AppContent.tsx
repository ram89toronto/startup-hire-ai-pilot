
import { Session } from "@supabase/supabase-js";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { PromptGenerator } from "@/components/PromptGenerator";
import { ScenarioBank } from "@/components/ScenarioBank";
import { LightningQuestions } from "@/components/LightningQuestions";
import { GeminiApiKeySetting } from "@/components/settings/GeminiApiKeySetting";

type AppContentProps = {
  session: Session;
  activeView: "dashboard" | "prompt-generator" | "analytics" | "settings";
};

export const AppContent = ({ session, activeView }: AppContentProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8
                       rounded-2xl shadow-lg border border-slate-200
                       bg-white"
      >
        {activeView === "dashboard" && <Dashboard session={session} />}

        {activeView === "prompt-generator" && (
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-800">Your Hiring Command Center</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">Generate, customize, and export professional hiring materials with AI</p>
            </div>
            
            <PromptGenerator />
            <ScenarioBank />
            <LightningQuestions />
          </div>
        )}

        {activeView === "analytics" && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-slate-800">Analytics</h2>
            <p className="text-slate-500 mt-2">This feature is coming soon!</p>
          </div>
        )}

        {activeView === "settings" && (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Settings</h2>
            <p className="text-slate-500 mb-6">Manage your account and integrations</p>
            <div className="w-full max-w-2xl space-y-8">
              {/* Gemini API Key setting */}
              <GeminiApiKeySetting />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
