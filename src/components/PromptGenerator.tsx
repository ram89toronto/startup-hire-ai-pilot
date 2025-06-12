
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Wand2 } from "lucide-react";
import { toast } from "sonner";

export const PromptGenerator = () => {
  const [formData, setFormData] = useState({
    roleTitle: "",
    companyContext: "",
    challenges: "",
    values: ""
  });
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const generatePrompt = () => {
    const prompt = `You are an AI assistant helping to hire for a startup.

**Role:** ${formData.roleTitle || "{{ROLE_TITLE}}"} (e.g. Technical Co-Founder, Generalist COO, Lead Backend Engineer)  
**Company Stage & Domain:** ${formData.companyContext || "{{BRIEF_CONTEXT}}"} (e.g. "Pre-seed SaaS in fintech, ~5 employees, incubator-backed")  
**Top Challenges:** ${formData.challenges || "{{CHALLENGES}}"} (e.g. "scaling MVP to 100k users in 6 months; pivoting from B2C to B2B; limited runway 8 months")  
**What We Value:** ${formData.values || "{{VALUES}}"} (e.g. "bias for action, extreme ownership, creative problem solving, user obsession")  

1. **Competency Matrix:** List 5–7 key competencies or skill areas critical for a **${formData.roleTitle || "{{ROLE_TITLE}}"}** at our stage. For each competency, provide:
   - A brief description.
   - What *excellent* performance looks like (specific behaviors or outcomes).
   - What *poor* performance looks like.

2. **Escalating Scenario Questions:** For each competency above, craft 1 situational interview question. Each question should:
   - Present a realistic startup scenario related to that competency.
   - Require the candidate to make a decision or solve a problem.
   - Escalate in difficulty or stakes as the interview progresses (from moderate challenge to "pressure-cooker").
   (Format: Competency – Question)

3. **Evaluation Rubric:** For each competency, outline criteria for evaluating the candidate's answer. Include what a strong answer contains vs. a weak answer, using a 1–5 scale if useful.

Ensure the tone is concise and professional. Format the response with clear headings for each section.`;

    setGeneratedPrompt(prompt);
    toast.success("Mega Prompt generated successfully!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">🔥 Mega Prompt Generator</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          The all-in-one interview generator. Fill in your details below and get an instant competency matrix, 
          scenario questions, and evaluation rubric.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Input Your Details
            </CardTitle>
            <CardDescription>
              Provide context about your role and startup to generate a tailored prompt
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="roleTitle">Role Title</Label>
              <Input
                id="roleTitle"
                placeholder="e.g. Technical Co-Founder, Lead Backend Engineer"
                value={formData.roleTitle}
                onChange={(e) => setFormData({...formData, roleTitle: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="companyContext">Company Stage & Domain</Label>
              <Input
                id="companyContext"
                placeholder="e.g. Pre-seed SaaS in fintech, ~5 employees, incubator-backed"
                value={formData.companyContext}
                onChange={(e) => setFormData({...formData, companyContext: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="challenges">Top Challenges</Label>
              <Textarea
                id="challenges"
                placeholder="e.g. scaling MVP to 100k users in 6 months; pivoting from B2C to B2B"
                value={formData.challenges}
                onChange={(e) => setFormData({...formData, challenges: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="values">What We Value</Label>
              <Textarea
                id="values"
                placeholder="e.g. bias for action, extreme ownership, creative problem solving"
                value={formData.values}
                onChange={(e) => setFormData({...formData, values: e.target.value})}
              />
            </div>
            <Button onClick={generatePrompt} className="w-full">
              Generate Mega Prompt
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Generated Prompt
              {generatedPrompt && (
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              )}
            </CardTitle>
            <CardDescription>
              Copy this prompt and paste it into ChatGPT or your preferred AI assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedPrompt ? (
              <Textarea
                value={generatedPrompt}
                readOnly
                className="min-h-[400px] font-mono text-sm"
              />
            ) : (
              <div className="min-h-[400px] flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                Fill in the form and click "Generate Mega Prompt" to see your custom prompt here
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
