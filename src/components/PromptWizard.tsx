
import React, { useState } from "react";
import { PromptRoleStep } from "./PromptRoleStep";
import { PromptContextStep } from "./PromptContextStep";
import { PromptScenarioStep } from "./PromptScenarioStep";
import { PromptPreviewStep } from "./PromptPreviewStep";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    { label: "Choose Role/Persona" },
    { label: "Add Context & Challenges" },
    { label: "Refine Scenario" },
    { label: "Preview & Generate" },
  ];

  function canProceed() {
    if (step === 0) return !!role;
    if (step === 1) return context.roleTitle && context.companyContext;
    if (step === 2) return scenario.length > 10;
    return true;
  }

  return (
    <div className="max-w-3xl mx-auto px-2">
      {/* Progress indicator */}
      <div className="flex items-center justify-between gap-2 mb-6">
        {steps.map((s, i) => (
          <div
            key={s.label}
            className={`flex-1 text-center rounded-full px-3 py-2 cursor-pointer ${
              i === step
                ? "bg-blue-600 text-white font-bold"
                : i < step
                  ? "bg-blue-100 text-blue-600"
                  : "bg-slate-200 text-slate-500"
            }`}
            onClick={() => {
              if (i <= step) setStep(i);
            }}
          >
            {i + 1}. {s.label}
          </div>
        ))}
      </div>
      <div>
        {step === 0 && (
          <PromptRoleStep
            value={role}
            onChange={value => {
              setRole(value);
              setStep(1); // Immediate forward on select
            }}
          />
        )}
        {step === 1 && (
          <PromptContextStep
            role={role}
            context={context}
            setContext={setContext}
          />
        )}
        {step === 2 && (
          <PromptScenarioStep
            role={role}
            scenario={scenario}
            setScenario={setScenario}
          />
        )}
        {step === 3 && (
          <PromptPreviewStep
            role={role}
            context={context}
            scenario={scenario}
            showPdf={showPdf}
            setShowPdf={setShowPdf}
          />
        )}
      </div>
      {/* Step Navigation */}
      <Card className="mt-6">
        <CardContent className="py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep(s => Math.max(0, s - 1))}
          >
            Previous
          </Button>
          <span className="font-medium text-slate-700">
            Step {step + 1} of {steps.length}
          </span>
          {step < steps.length - 1 ? (
            <Button
              variant="default"
              disabled={!canProceed()}
              onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setStep(0)}
            >
              Start Over
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

