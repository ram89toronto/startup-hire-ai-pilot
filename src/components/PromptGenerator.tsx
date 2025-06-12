
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Wand2, Download, FileText, Settings, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AIConfigDialog } from "@/components/ai/AIConfigDialog";
import { PDFPreviewDialog } from "@/components/pdf/PDFPreviewDialog";

export const PromptGenerator = () => {
  const [formData, setFormData] = useState({
    roleTitle: "",
    companyContext: "",
    challenges: "",
    values: "",
    aiProvider: "openai"
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIConfig, setShowAIConfig] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const generateContent = async () => {
    if (!formData.roleTitle || !formData.companyContext) {
      toast.error("Please fill in at least the role title and company context");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const content = `# Interview Guide for ${formData.roleTitle}

## Company Context
${formData.companyContext}

## Key Challenges
${formData.challenges || "No specific challenges mentioned"}

## Core Values
${formData.values || "Standard startup values"}

## Competency Matrix

### 1. Technical Excellence
**Description:** Ability to deliver high-quality technical solutions
**Excellent Performance:** Demonstrates deep technical knowledge, writes clean code, makes scalable architecture decisions
**Poor Performance:** Struggles with basic concepts, produces buggy code, ignores best practices

### 2. Startup Adaptability  
**Description:** Thrives in fast-paced, uncertain environments
**Excellent Performance:** Embraces change, pivots quickly, maintains quality under pressure
**Poor Performance:** Resists change, overwhelmed by ambiguity, quality drops under stress

### 3. Leadership Potential
**Description:** Can guide and inspire team members
**Excellent Performance:** Takes initiative, mentors others, drives consensus
**Poor Performance:** Avoids responsibility, poor communication, creates conflict

## Scenario Questions

### Technical Challenge
"Our system is experiencing 10x traffic growth overnight. Walk me through your approach to scaling our infrastructure in the next 48 hours."

### Adaptability Test  
"We need to pivot our product strategy based on user feedback. How would you lead your team through this transition?"

### Leadership Scenario
"Two team members are in conflict over technical decisions. How do you resolve this while maintaining team morale?"

## Evaluation Rubric

Rate each competency on a 1-5 scale:
- 1: Well below expectations
- 2: Below expectations  
- 3: Meets expectations
- 4: Exceeds expectations
- 5: Outstanding performance

## Lightning Questions
- What's your contrarian view about our industry?
- Tell me about creating something from nothing
- How do you handle failure and bounce back?
`;
      
      setGeneratedContent(content);
      setIsGenerating(false);
      toast.success("Interview guide generated successfully! (1 token used)");
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Content copied to clipboard!");
  };

  const generatePDF = () => {
    if (!generatedContent) {
      toast.error("Please generate content first");
      return;
    }
    setShowPDFPreview(true);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">🔥 AI Interview Generator</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Generate comprehensive interview guides, competency matrices, and evaluation rubrics using advanced AI
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                <CardTitle>Configure Your Interview</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowAIConfig(true)}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              Provide details about your role and company to generate tailored content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="roleTitle">Role Title *</Label>
              <Input
                id="roleTitle"
                placeholder="e.g. Technical Co-Founder, Lead Backend Engineer"
                value={formData.roleTitle}
                onChange={(e) => setFormData({...formData, roleTitle: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="companyContext">Company Stage & Domain *</Label>
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

            <div>
              <Label htmlFor="aiProvider">AI Provider</Label>
              <Select value={formData.aiProvider} onValueChange={(value) => setFormData({...formData, aiProvider: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                  <SelectItem value="anthropic">Claude 3.5</SelectItem>
                  <SelectItem value="google">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={generateContent} className="w-full" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Interview Guide (1 token)
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Content</CardTitle>
              <div className="flex gap-2">
                {generatedContent && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={generatePDF}>
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </>
                )}
              </div>
            </div>
            <CardDescription>
              Your AI-generated interview guide will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono">
                    {generatedContent}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="min-h-[400px] flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Fill in the form and click "Generate Interview Guide" to see your custom content here</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AIConfigDialog open={showAIConfig} onOpenChange={setShowAIConfig} />
      <PDFPreviewDialog 
        open={showPDFPreview} 
        onOpenChange={setShowPDFPreview}
        content={generatedContent}
        title={`Interview Guide - ${formData.roleTitle}`}
      />
    </div>
  );
};
