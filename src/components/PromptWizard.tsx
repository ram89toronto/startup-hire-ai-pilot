import React, { useState } from "react";
import { PromptRoleStep } from "./PromptRoleStep";
import { PromptContextStep } from "./PromptContextStep";
import { PromptScenarioStep } from "./PromptScenarioStep";
import { PromptPreviewStep } from "./PromptPreviewStep";
import { TokenDisplay } from "./tokens/TokenDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

/**
 * Converts role key to label for display.
 */
function getRoleLabel(role: string) {
  if (role === "software-engineer") return "Coder/Engineer";
  if (role === "product-owner") return "Product Owner";
  if (role === "ux-designer") return "Builder/Designer";
  return "";
}

const initialContextState = {
  roleTitle: "",
  companyContext: "",
  challenges: "",
  values: "",
};

export function PromptWizard() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [context, setContext] = useState(initialContextState);
  const [scenario, setScenario] = useState("");
  const [showPdf, setShowPdf] = useState(false);

  // For step labels & navigation
  const steps = [
    { label: "Choose Role", icon: "👤" },
    { label: "Add Context", icon: "🏢" },
    { label: "Define Scenario", icon: "💡" },
    { label: "Generate & Export", icon: "📋" },
  ];

  function canProceed() {
    if (step === 0) return !!role;
    if (step === 1) return context.roleTitle && context.companyContext;
    if (step === 2) return scenario.length > 10;
    return true;
  }

  const progressPercentage = ((step + 1) / steps.length) * 100;

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-8">
      {/* Enhanced Progress Indicator */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Interview Guide Builder</h2>
          <div className="text-sm font-medium text-slate-600">
            Step {step + 1} of {steps.length}
          </div>
        </div>
        
        <Progress value={progressPercentage} className="mb-4 h-3" />
        
        <div className="grid grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div
              key={s.label}
              className={`text-center p-4 rounded-xl cursor-pointer transition-all ${
                i === step
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                  : i < step
                    ? "bg-gradient-to-r from-green-100 to-blue-100 text-green-700 border border-green-200"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
              onClick={() => {
                if (i <= step) setStep(i);
              }}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Token Display */}
      <TokenDisplay />

      {/* Step Content */}
      <div className="min-h-[600px]">
        {step === 0 && (
          <div className="animate-fade-in">
            <PromptRoleStep
              value={role}
              onChange={value => {
                setRole(value);
                setTimeout(() => setStep(1), 300); // Smooth transition
              }}
            />
          </div>
        )}
        {step === 1 && (
          <div className="animate-fade-in">
            <PromptContextStep
              role={role}
              context={context}
              setContext={setContext}
            />
          </div>
        )}
        {step === 2 && (
          <div className="animate-fade-in">
            <PromptScenarioStep
              role={role}
              scenario={scenario}
              setScenario={setScenario}
            />
          </div>
        )}
        {step === 3 && (
          <div className="animate-fade-in">
            <PromptPreviewStep
              role={role}
              context={context}
              scenario={scenario}
              showPdf={showPdf}
              setShowPdf={setShowPdf}
            />
          </div>
        )}
      </div>

      {/* Enhanced Navigation */}
      <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
        <CardContent className="py-6 flex justify-between items-center">
          <Button
            variant="outline"
            disabled={step === 0}
            onClick={() => setStep(s => Math.max(0, s - 1))}
            className="flex items-center gap-2 hover:bg-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Step
          </Button>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">
              {getRoleLabel(role)} • {context.roleTitle || "Role Title"} 
            </span>
            {step === steps.length - 1 && (
              <Button
                variant="outline"
                onClick={() => {
                  setStep(0);
                  setRole("");
                  setContext(initialContextState);
                  setScenario("");
                }}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
              >
                <RotateCcw className="h-4 w-4" />
                Start Over
              </Button>
            )}
          </div>

          {step < steps.length - 1 ? (
            <Button
              disabled={!canProceed()}
              onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Next Step
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowPdf(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 border-green-200 text-green-700 hover:bg-green-100"
            >
              View PDF
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
