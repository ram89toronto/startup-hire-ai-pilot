import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Sparkles, Clock, Lightbulb, Paperclip } from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';
import { toast } from 'sonner';
import { ChatMessageBubble } from "./ChatMessageBubble";

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
    <section
      className="flex flex-col h-full w-full bg-white md:rounded-lg shadow-lg border border-slate-100/70 max-w-full"
      aria-label="Chat panel"
    >
      {/* Header */}
      <header className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 border-b bg-gradient-to-r from-purple-50 to-blue-50 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" aria-hidden="true" />
          <span className="font-semibold text-lg text-purple-700">
            Interview Assistant
          </span>
        </div>
        <Badge variant="secondary" className="text-xs">
          {getRemainingTokens()} tokens
        </Badge>
      </header>

      {/* Chat Feed */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-1 px-2 sm:px-6 pt-4 pb-1 transition-all" role="log" aria-live="polite">
        {messages.map((message, idx) => (
          <ChatMessageBubble
            key={message.id}
            type={message.type === "assistant" ? "assistant" : "user"}
            content={message.content}
            timestamp={message.timestamp}
            animate
          />
        ))}

        {isTyping && (
          <div className="flex items-end gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>
                <Bot className="w-4 h-4 text-purple-500" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-purple-600 text-white rounded-bl-xl rounded-t-xl rounded-br-md px-4 py-2 shadow animate-fade-in">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: ".15s" }}></div>
                <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: ".3s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div aria-hidden="true" style={{ height: 1 }} ref={scrollRef} />
      </div>

      {/* Input Bar */}
      <form
        className="border-t sticky bottom-0 bg-white/95 px-3 sm:px-6 py-2 flex gap-2 items-end z-10"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        aria-label="Send message"
      >
        {/* Attachment */}
        <button
          type="button"
          className="p-2 rounded-full hover:bg-slate-100 focus-visible:ring-2 focus:ring-purple-300 transition-colors"
          aria-label="Attach file"
        >
          <Paperclip className="h-5 w-5 text-slate-400" />
        </button>
        {/* Text input */}
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isTyping || getRemainingTokens() === 0}
          className="flex-1 border-slate-200 focus:border-purple-400 text-[1rem] bg-slate-50"
          aria-label="Chat message input"
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        {/* Send button */}
        <Button
          type="submit"
          disabled={!input.trim() || isTyping || getRemainingTokens() === 0}
          className="bg-purple-600 hover:bg-purple-700 rounded-full px-3 py-2 flex items-center justify-center focus-visible:ring-2 focus:ring-purple-300"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>

      {/* Token error */}
      {getRemainingTokens() === 0 && (
        <div className="p-2 text-xs text-red-600 text-center bg-red-50 border-t border-red-200">
          No tokens remaining. Upgrade for unlimited chat!
        </div>
      )}
    </section>
  );
};
