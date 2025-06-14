
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/** Returns example scenarios for each role as baseline */
function getScenarioExamples(role: string) {
  switch (role) {
    case "software-engineer":
      return [
        {
          title: "Code Quality & Trade-Off",
          scenario:
            "Given a codebase with legacy modules and increasing traffic, how would you identify areas for refactoring, and what trade-offs might you face under time pressure? What design patterns or practices would you use?",
        },
        {
          title: "System Scaling Challenge",
          scenario:
            "Our service is facing a 10x surge in users. Which parts of the stack do you prioritize, and how do you verify solutions under live conditions?",
        },
      ];
    case "product-owner":
      return [
        {
          title: "Ambiguous Customer Request",
          scenario:
            "A user claims they want 'faster onboarding,' but gives no clear details. What questions do you ask? How do you clarify requirements and shape a product goal?",
        },
        {
          title: "Prioritization Exercise",
          scenario:
            "You're given 7 feature requests and limited resources. Describe your framework for deciding what to build next and how you communicate reasoning to stakeholders.",
        },
      ];
    case "ux-designer":
      return [
        {
          title: "Redesign User Flow",
          scenario:
            "The app’s onboarding has a 70% drop-off rate. Sketch your approach for diagnosing the problem and redesigning the flow, then explain your reasoning.",
        },
        {
          title: "Empathy Mapping",
          scenario:
            "You interview several users with conflicting needs. How do you balance their feedback and present solutions aligning with the company’s values?",
        },
      ];
    default:
      return [];
  }
}

export function PromptScenarioStep({
  role,
  scenario,
  setScenario,
}: {
  role: string;
  scenario: string;
  setScenario: (s: string) => void;
}) {
  const examples = getScenarioExamples(role);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenarios & Evaluation Focus</CardTitle>
        <CardDescription>
          Below are startup-relevant scenarios and suggested questions to probe the candidate’s judgment and reasoning.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {examples.length > 0 && (
          <div className="mb-4">
            <div className="text-slate-600 mb-2 font-semibold">Sample Scenarios:</div>
            <ul className="space-y-2">
              {examples.map(ex => (
                <li key={ex.title} className="bg-slate-50 rounded-lg p-3 border text-sm">
                  <b>{ex.title}: </b>
                  {ex.scenario}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <Label htmlFor="scenarioCustom">
            Custom/Contextual Scenario (edit or create your own)
          </Label>
          <Textarea
            id="scenarioCustom"
            value={scenario}
            onChange={e => setScenario(e.target.value)}
            placeholder="Type a custom scenario, or build from sample above…"
            rows={6}
          />
        </div>
      </CardContent>
    </Card>
  );
}
