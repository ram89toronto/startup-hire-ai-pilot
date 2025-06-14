
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Sparkles, UserCheck, Wand2 } from "lucide-react";

const roleOptions = [
  {
    value: "software-engineer",
    label: "Coder/Engineer",
    icon: <Wand2 className="h-6 w-6 text-blue-600" />,
    deepMind: "Evaluates technical patterns, code analysis, and decision trade-offs under pressure.",
  },
  {
    value: "product-owner",
    label: "Product Owner",
    icon: <UserCheck className="h-6 w-6 text-green-600" />,
    deepMind: "Judges customer-centric thinking, ambiguity handling and strategic prioritization.",
  },
  {
    value: "ux-designer",
    label: "Builder/Designer",
    icon: <Sparkles className="h-6 w-6 text-purple-600" />,
    deepMind: "Assesses user empathy, real workflow design, and creative scenario reasoning.",
  },
];

export function PromptRoleStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Interview Persona</CardTitle>
        <CardDescription>
          Choose a role for the candidate. DeepMind-style templates & evaluation will be loaded.
        </CardDescription>
      </CardHeader>
      <div className="p-6">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="flex gap-2 items-center">
                <div className="flex gap-2 items-center">
                  {opt.icon}
                  <span>{opt.label}</span>
                </div>
                <div className="ml-2 text-xs text-slate-500 italic">{opt.deepMind}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
