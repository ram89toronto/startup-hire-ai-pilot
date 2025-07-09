import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PDFPreviewDialog } from "@/components/pdf/PDFPreviewDialog";
import { EnhancedRagChat } from "@/components/chat/EnhancedRagChat";
import { GoogleApiToggles } from "@/components/google/GoogleApiToggles";
import { TokenDisplay } from "@/components/tokens/TokenDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useTokens } from "@/hooks/useTokens";
import { useGoogleApis } from "@/hooks/useGoogleApis";
import { FileText, MessageCircle, Settings, Search, Sparkles } from "lucide-react";
import { PromptWizardSidebarLayout } from "./PromptWizardSidebarLayout";
import { PromptContext } from "@/types/prompt";

export function PromptPreviewStep({
  role,
  context,
  scenario,
  setShowPdf,
  showPdf,
}: {
  role: string;
  context: PromptContext;
  scenario: string;
  setShowPdf: (v: boolean) => void;
  showPdf: boolean;
}) {
  const { consumeTokens, getRemainingTokens } = useTokens();
  const { searchCompanyInfo, isSearching, config } = useGoogleApis();
  const [enhancedContent, setEnhancedContent] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const title = `Interview Guide - ${context.roleTitle || "Untitled"}`;
  const baseContent = `# ${context.roleTitle || "Role"}

## Company Context
${context.companyContext}
${context.challenges ? "\n\n## Key Challenges\n" + context.challenges : ""}
${context.values ? "\n\n## Core Values\n" + context.values : ""}
${scenario ? "\n\n## Interview Scenario\n" + scenario : ""}

## Evaluation Framework
Use this structured approach to assess candidates:

### Technical Competency (1-5)
- Problem-solving methodology
- Technical accuracy and depth
- Best practices awareness

### Communication Skills (1-5)
- Clarity of explanation
- Active listening
- Stakeholder consideration

### Cultural Alignment (1-5)
- Company values alignment
- Collaboration approach
- Growth mindset demonstration

### Scenario Performance (1-5)
- Practical application
- Decision-making process
- Risk assessment

**Total Score: ___/20**

## Interview Process
1. **Introduction** (5 min) - Role overview and expectations
2. **Scenario Discussion** (25 min) - Present scenario and facilitate discussion  
3. **Follow-up Questions** (15 min) - Probe deeper based on responses
4. **Candidate Questions** (10 min) - Allow candidate to ask questions
5. **Next Steps** (5 min) - Explain process and timeline

## Red Flags to Watch
- Overconfidence without substance
- Inability to explain trade-offs
- Poor communication or listening
- Negative attitude toward collaboration
- Unrealistic expectations

## Success Indicators
- Clear problem-solving approach
- Thoughtful questions and considerations
- Collaborative mindset
- Alignment with company values
- Realistic assessment of challenges`;

  const handleEnhanceWithAI = async () => {
    const remaining = getRemainingTokens();
    if (remaining === 0) {
      toast.error('No tokens remaining! Upgrade for unlimited enhancements.');
      return;
    }

    setIsEnhancing(true);
    
    // Consume token for AI enhancement
    const canProceed = await consumeTokens(2);
    if (!canProceed) {
      toast.error('Insufficient tokens for AI enhancement.');
      setIsEnhancing(false);
      return;
    }

    try {
      // Search for additional context if Google APIs are enabled
      let searchResults = [];
      if (config.search || config.scholar || config.trends) {
        searchResults = await searchCompanyInfo(context.companyContext, context.roleTitle);
      }

      // Simulate AI enhancement
      setTimeout(() => {
        const enhanced = baseContent + `

## AI-Enhanced Insights
${searchResults.length > 0 ? `
### Market Intelligence
${searchResults.map(result => `- **${result.title}**: ${result.snippet}`).join('\n')}
` : ''}

### Advanced Evaluation Criteria
- **Industry Alignment**: Assess knowledge of current industry trends and challenges
- **Innovation Potential**: Evaluate creative problem-solving and forward-thinking
- **Adaptability**: Measure flexibility in changing requirements or constraints
- **Leadership Potential**: Observe decision-making and influence capabilities

### Behavioral Indicators
- **High Performers**: Ask clarifying questions, consider multiple perspectives, acknowledge limitations
- **Strong Candidates**: Show systematic thinking, communicate trade-offs clearly, demonstrate learning agility
- **Concerns**: Make assumptions without validation, provide generic solutions, show rigidity in approach

### Follow-up Question Bank
**Technical Deep-dive:**
- "Walk me through your debugging process for this scenario"
- "How would you optimize this for scale?"
- "What testing strategy would you implement?"

**Collaboration Assessment:**
- "How would you handle disagreement with this approach?"
- "Describe how you'd communicate this to stakeholders"
- "What would you need from the team to succeed?"

**Strategic Thinking:**
- "What's the biggest risk with this solution?"
- "How does this fit into the broader product strategy?"
- "What metrics would indicate success?"

### Scoring Calibration
**Score 5 (Exceptional)**: Exceeds expectations, demonstrates mastery, provides innovative insights
**Score 4 (Strong)**: Meets all expectations, solid performance, good practical application
**Score 3 (Adequate)**: Meets basic requirements, acceptable approach, minor gaps
**Score 2 (Below Expectations)**: Significant gaps, unclear reasoning, needs substantial improvement
**Score 1 (Poor)**: Major deficiencies, inappropriate approach, fundamental misunderstanding

Generated with AI assistance and real-time market data.`;

        setEnhancedContent(enhanced);
        setIsEnhancing(false);
        toast.success('Interview guide enhanced with AI insights!');
      }, 2000);
    } catch (error) {
      setIsEnhancing(false);
      toast.error('Enhancement failed. Please try again.');
    }
  };

  const handleGeneratePDF = async () => {
    const remaining = getRemainingTokens();
    if (remaining === 0) {
      toast.error('No tokens remaining! Upgrade for unlimited PDF generation.');
      return;
    }

    if (!context.roleTitle || !context.companyContext || !scenario) {
      toast.error("Fill out all required fields first.");
      return;
    }

    const canProceed = await consumeTokens(1);
    if (!canProceed) {
      toast.error('Insufficient tokens for PDF generation.');
      return;
    }

    setShowPdf(true);
    toast.success('PDF generated successfully!');
  };

  const chatContext = {
    role,
    roleTitle: context.roleTitle,
    companyContext: context.companyContext,
    scenario,
  };

  return (
    <PromptWizardSidebarLayout
      chatContext={chatContext}
      showPdf={showPdf}
      setShowPdf={setShowPdf}
      previewTab={
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-slate-800">Preview & Generate</h2>
            <p className="text-lg text-slate-600">
              Review your interview guide, enhance with AI, and export professionally
            </p>
          </div>
          <TokenDisplay />
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Interview Guide Preview</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleEnhanceWithAI}
                    disabled={isEnhancing || getRemainingTokens() < 2}
                    className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
                  </Button>
                  <Button
                    onClick={handleGeneratePDF}
                    disabled={getRemainingTokens() === 0}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-6 rounded-lg max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono leading-relaxed">
                  {enhancedContent || baseContent}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      }
      researchTab={
        <div className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Market Research & Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <GoogleApiToggles />
              {(config.search || config.scholar || config.trends) && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Research Integration Active</h4>
                  <p className="text-sm text-blue-700">
                    Your interview guides will be automatically enhanced with real-time market data, 
                    industry insights, and best practices from enabled sources.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      }
      settingsTab={
        <div className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">PDF Export Options</h4>
                  <div className="space-y-2 text-sm text-slate-600">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      Include scoring rubrics
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      Add company branding
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Generate multiple formats
                    </label>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">AI Preferences</h4>
                  <div className="space-y-2 text-sm text-slate-600">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      Include market insights
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked />
                      Bias detection alerts
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Auto-save conversations
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      }
      pdfDialog={
        <PDFPreviewDialog
          open={showPdf}
          onOpenChange={setShowPdf}
          content={enhancedContent || baseContent}
          title={title}
        />
      }
    />
  );
}
