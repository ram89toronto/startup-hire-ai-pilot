import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Wand2, Download, FileText, Settings, Sparkles, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { AIConfigDialog } from "@/components/ai/AIConfigDialog";
import { PDFPreviewDialog } from "@/components/pdf/PDFPreviewDialog";

const generateRoleBasedContent = (formData) => {
    const baseContent = `# Interview Guide for ${formData.roleTitle}
## Company Context
${formData.companyContext}
## Key Challenges
${formData.challenges || "No specific challenges mentioned"}
## Core Values
${formData.values || "Standard startup values"}`;

    switch (formData.role) {
        case 'software-engineer':
            return `${baseContent}

## Competency Matrix: Software Engineer
### 1. Technical Excellence & System Design
**Description:** Designs and implements robust, scalable, and maintainable systems.
**Excellent:** Writes clean, well-tested code. Makes sound architectural decisions.
**Poor:** Produces buggy code. Ignores best practices.
### 2. Problem Solving
**Description:** Effectively breaks down complex problems and finds practical solutions.
**Excellent:** Analyzes issues from multiple angles. Proposes innovative solutions.
**Poor:** Gets stuck on problems. Over-engineers simple tasks.

## Scenario Questions
- "Our system is experiencing 10x traffic growth. Walk me through scaling our infrastructure."
- "Here’s a piece of legacy code with a bug. Find it, fix it, and explain your reasoning."`;
        case 'product-owner':
            return `${baseContent}

## Competency Matrix: Product Owner
### 1. Customer Centricity & Vision
**Description:** Deeply understands customer needs and translates them into a compelling product vision.
**Excellent:** Champions the user. Articulates a clear vision.
**Poor:** Misinterprets user feedback. Lacks a clear product strategy.
### 2. Prioritization & Execution
**Description:** Ruthlessly prioritizes features to maximize impact and deliver value.
**Excellent:** Uses data to make decisions. Manages the backlog effectively.
**Poor:** Easily distracted by new ideas. Fails to ship features.

## Scenario Questions
- "We have ambiguous feedback from a major customer. How do you clarify their needs and define requirements?"
- "Here are 10 feature requests and engineering estimates. How do you decide what to build next quarter?"`;
        case 'ux-designer':
            return `${baseContent}

## Competency Matrix: UX/UI Designer
### 1. User Empathy & Research
**Description:** Gathers and synthesizes user insights to drive design decisions.
**Excellent:** Conducts effective user research. Creates detailed user personas and journey maps.
**Poor:** Designs based on personal preference. Ignores user data.
### 2. Interaction & Visual Design
**Description:** Creates intuitive, accessible, and aesthetically pleasing interfaces.
**Excellent:** Produces pixel-perfect mockups and prototypes. Has a strong grasp of design principles.
**Poor:** Cluttered and inconsistent designs. Poor user flow.

## Scenario Questions
- "Our app has a high drop-off rate during onboarding. Redesign the flow and justify your changes."
- "Create a low-fidelity wireframe for a new feature that does X. Talk me through your design process."`;
        default:
            return "Please select a role to generate content.";
    }
}

export const PromptGenerator = () => {
  const [formData, setFormData] = useState({
    roleTitle: "",
    companyContext: "",
    challenges: "",
    values: "",
    aiProvider: "openai",
    role: "software-engineer"
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
      const content = generateRoleBasedContent(formData);
      
      setGeneratedContent(content);
      setIsGenerating(false);
      toast.success("Interview guide generated successfully! (1 token used)");
    }, 1500);
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
              <Label htmlFor="role">Role Type *</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software-engineer">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      <span>Software Engineer</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="product-owner">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-green-500" />
                      <span>Product Owner</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ux-designer">
                    <div className="flex items-center gap-2">
                      <Wand2 className="h-4 w-4 text-purple-500" />
                      <span>UX/UI Designer</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
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
