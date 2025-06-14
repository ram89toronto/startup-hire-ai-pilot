
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PDFPreviewDialog } from "@/components/pdf/PDFPreviewDialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Simulates a "RAG Chat" feature where users can ask questions about
 * the generated interview scenario/content, and the system gives canned explanations.
 */
function fakeRagChatResponse(question: string, { role, scenario }: any) {
  // In production, swap with OpenAI API, etc.
  if (!question || question.length < 3) return "Please ask a more specific question about this scenario.";
  if (/trade[\s-]?offs?/i.test(question))
    return "Trade-off questions help assess whether a candidate can reason about technical versus business constraints, revealing their judgment style.";
  if (/how.*score|criteria/i.test(question))
    return "Score candidates by their depth of reasoning, not just the 'right answer.' Look for practical thinking, clear trade-off articulation, and self-awareness of limits.";
  if (/how.*should.*approach/i.test(question))
    return "Look for candidates breaking down the problem into logical steps and validating assumptions.";
  if (/redesign/i.test(question))
    return "Expect the candidate to identify bottlenecks, collect user feedback, and propose iterative solutions aligned with business outcomes.";
  return "Focus on how well the candidate explains their thinking. Strong evaluators use scenario-based questions to reveal true problem-solving ability.";
}

export function PromptPreviewStep({
  role,
  context,
  scenario,
  setShowPdf,
  showPdf,
}: {
  role: string;
  context: any;
  scenario: string;
  setShowPdf: (v: boolean) => void;
  showPdf: boolean;
}) {
  const [ragQ, setRagQ] = useState("");
  const [ragA, setRagA] = useState<string | null>(null);

  const title = `Interview Guide - ${context.roleTitle || "Untitled"}`;
  const generatedContent = `# ${context.roleTitle || "Role"}
## Company Context
${context.companyContext}
${context.challenges ? "\n\n## Key Challenges\n" + context.challenges : ""}
${context.values ? "\n\n## Core Values\n" + context.values : ""}
${scenario ? "\n\n## Scenario\n" + scenario : ""}`;

  function handleRagChat() {
    if (!ragQ.trim()) return;
    setRagA("...");
    setTimeout(() => {
      setRagA(fakeRagChatResponse(ragQ, { role, context, scenario }));
    }, 400);
  }

  return (
    <div>
      <div className="mb-6 text-xl font-bold text-center">Preview & Interact</div>
      <div className="bg-slate-100 rounded-lg p-4 mb-4">
        {/* RAG chat box */}
        <div className="flex gap-2 flex-col md:flex-row md:items-center">
          <Input
            placeholder="Ask about evaluation, criteria, or this scenario (e.g. How do I score this? What skills are assessed?)"
            value={ragQ}
            onChange={e => setRagQ(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleRagChat(); }}
          />
          <Button variant="secondary" onClick={handleRagChat} disabled={!ragQ}>Ask Guide</Button>
        </div>
        {ragA && (
          <div className="mt-2 rounded bg-white border p-3 text-slate-700 text-sm shadow-inner">
            <b>AI:</b> {ragA}
          </div>
        )}
      </div>
      <div className="flex justify-end mb-2">
        <Button
          variant="default"
          onClick={() => {
            if (!context.roleTitle || !context.companyContext || !scenario) {
              toast.error("Fill out all required fields first.");
              return;
            }
            setShowPdf(true);
          }}
        >
          Preview & Download as PDF
        </Button>
      </div>
      <PDFPreviewDialog
        open={showPdf}
        onOpenChange={setShowPdf}
        content={generatedContent}
        title={title}
      />
      <div className="bg-slate-50 p-4 rounded-lg mt-6">
        <pre className="whitespace-pre-wrap text-[13px] text-slate-700 font-mono">
          {generatedContent}
        </pre>
      </div>
    </div>
  );
}
