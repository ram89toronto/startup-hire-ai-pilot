
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Sparkles, Clock, Lightbulb } from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface EnhancedRagChatProps {
  context: {
    role: string;
    roleTitle: string;
    companyContext: string;
    scenario: string;
  };
}

export const EnhancedRagChat = ({ context }: EnhancedRagChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'system',
      content: '👋 I\'m your AI interview assistant! Ask me anything about evaluation criteria, scoring methods, or how to improve your interview process.',
      timestamp: new Date(),
      suggestions: [
        'How should I score this scenario?',
        'What red flags should I watch for?',
        'Suggest follow-up questions',
        'How can I reduce bias?'
      ]
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { consumeTokens, getRemainingTokens } = useTokens();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Enhanced AI responses based on context
    const responses = {
      score: `For scoring this ${context.role} scenario, I recommend using a 1-5 scale across these dimensions:

**Technical Competency** (1-5)
- Problem-solving approach
- Technical accuracy
- Best practices awareness

**Communication** (1-5)  
- Clarity of explanation
- Asking clarifying questions
- Stakeholder consideration

**Cultural Fit** (1-5)
- Alignment with company values
- Collaboration approach
- Growth mindset

**Scenario-Specific** (1-5)
- Handling of ${context.scenario.slice(0, 50)}...
- Practical application
- Risk assessment

*Total Score: ___/20*`,
      
      'red flags': `Key red flags to watch for during this ${context.role} interview:

🚩 **Technical Red Flags:**
- Overly confident without substance
- Blaming previous teams/companies
- Unable to explain trade-offs

🚩 **Communication Red Flags:**
- Not asking clarifying questions
- Dismissive of feedback
- Poor listening skills

🚩 **Cultural Red Flags:**
- Negative attitude toward collaboration
- Inflexibility in approach
- Lack of curiosity about the company

🚩 **Role-Specific Red Flags:**
- For ${context.roleTitle}: Missing key competencies expected at this level
- Unrealistic expectations about timeline/scope`,

      'follow-up': `Great follow-up questions for this scenario:

**Probing Deeper:**
• "Walk me through your thought process when you made that decision"
• "What would you do differently if you had 50% more time?"
• "How would you communicate this to non-technical stakeholders?"

**Exploring Edge Cases:**
• "What if the initial assumption was wrong?"
• "How would you handle pushback on this approach?"
• "What metrics would you use to measure success?"

**Cultural Assessment:**
• "Tell me about a time you disagreed with a team decision"
• "How do you stay updated in your field?"
• "What questions do you have about our team/culture?"`,

      bias: `Here's how to reduce bias in this interview:

**Structured Approach:**
✓ Use the same scenario for all candidates
✓ Score each dimension independently
✓ Take notes during, not after the interview

**Bias Mitigation:**
✓ Focus on behavior, not personality
✓ Ask for specific examples, not generalizations  
✓ Have multiple interviewers when possible

**Inclusive Practices:**
✓ Avoid culture-fit for culture-add
✓ Don't penalize different communication styles
✓ Consider different backgrounds as strengths

**Documentation:**
✓ Record specific examples of good/poor answers
✓ Note the reasoning behind scores
✓ Review patterns across candidates`,

      default: `I can help you with this ${context.role} interview! Here are some insights:

**About the Role:** ${context.roleTitle} at ${context.companyContext}

**Key Focus Areas:**
- Technical skills evaluation
- Problem-solving approach
- Team collaboration
- Cultural alignment

**Scenario Analysis:**
Your scenario tests real-world application of skills, which is excellent for predicting job performance.

Would you like me to elaborate on any specific aspect?`
    };

    if (userMessage.toLowerCase().includes('score') || userMessage.toLowerCase().includes('evaluate')) {
      return responses.score;
    } else if (userMessage.toLowerCase().includes('red flag') || userMessage.toLowerCase().includes('warning')) {
      return responses['red flags'];
    } else if (userMessage.toLowerCase().includes('follow-up') || userMessage.toLowerCase().includes('question')) {
      return responses['follow-up'];
    } else if (userMessage.toLowerCase().includes('bias') || userMessage.toLowerCase().includes('fair')) {
      return responses.bias;
    } else {
      return responses.default;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const remainingTokens = getRemainingTokens();
    if (remainingTokens === 0) {
      toast.error('No tokens remaining! Upgrade for unlimited chat.');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Consume token
    await consumeTokens(1);

    // Simulate typing delay
    setTimeout(async () => {
      const response = await generateResponse(input);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <Card className="h-[500px] flex flex-col bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Sparkles className="h-5 w-5" />
          AI Interview Assistant
          <Badge variant="secondary" className="ml-auto">
            {getRemainingTokens()} tokens
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  {message.type !== 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      {message.type === 'system' ? (
                        <Sparkles className="h-4 w-4 text-purple-600" />
                      ) : (
                        <Bot className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white ml-auto' 
                      : 'bg-white border border-purple-200 text-slate-700'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                      <Clock className="h-3 w-3" />
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                </div>

                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 ml-11">
                    {message.suggestions.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs border-purple-200 hover:bg-purple-50"
                      >
                        <Lightbulb className="h-3 w-3 mr-1" />
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-purple-600" />
                </div>
                <div className="bg-white border border-purple-200 rounded-xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-purple-200 bg-white/50">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about evaluation criteria, scoring, red flags..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="border-purple-200 focus:border-purple-400"
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isTyping || getRemainingTokens() === 0}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {getRemainingTokens() === 0 && (
            <p className="text-xs text-red-600 mt-2">No tokens remaining. Upgrade for unlimited chat!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
