import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Sparkles, Paperclip, Bolt, Loader2 } from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';
import { toast } from 'sonner';
import { ChatMessageBubble } from "./ChatMessageBubble";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useGeminiApiKey } from '@/hooks/useGeminiApiKey';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  isStreaming?: boolean;
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
      content: "👋 I'm your AI interview assistant, powered by Gemini! Ask me anything about evaluation criteria, scoring methods, or how to improve your interview process.",
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
  const { apiKey, isLoading: isApiKeyLoading, saveApiKey, isSaving } = useGeminiApiKey();
  const [tempApiKey, setTempApiKey] = useState('');

  const { consumeTokens, getRemainingTokens } = useTokens();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!apiKey) {
      toast.error("Please set your Gemini API key to chat.");
      return;
    }

    const canConsume = await consumeTokens(1);
    if (!canConsume) {
      toast.error('No tokens remaining! Upgrade for unlimited chat.');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    const currentInput = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const systemInstruction = `You are an expert AI interview assistant for the role of ${context.roleTitle} at ${context.companyContext}. The current interview scenario is: ${context.scenario}. Be helpful, concise, and provide guidance on evaluating candidates.`;
      const model = genAI.getGenerativeModel({ model: "gemini-pro", systemInstruction });
      
      const chatHistory = messages
        .filter(m => m.type === 'user' || m.type === 'assistant')
        .map(m => ({ role: m.type, parts: [{ text: m.content }] }));

      const result = await model.generateContentStream(currentInput);

      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        type: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages(prev => [...prev, assistantMessage]);

      let text = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
        setMessages(prev =>
            prev.map(msg =>
                msg.id === assistantMessageId ? { ...msg, content: text } : msg
            )
        );
      }

      setMessages(prev =>
        prev.map(msg =>
            msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg
        )
      );
    } catch (error) {
      console.error("Error with Gemini API:", error);
      toast.error("An error occurred with the AI. Check your API key and console.");
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: "Sorry, I couldn't get a response. Please check your API key, network connection, and the developer console for errors.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  if (isApiKeyLoading) {
    return (
        <div className="flex flex-col h-full w-full bg-white md:rounded-lg shadow-lg border border-slate-100/70 p-6 items-center justify-center">
             <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
    );
  }

  if (!apiKey) {
    return (
      <div className="flex flex-col h-full w-full bg-white md:rounded-lg shadow-lg border border-slate-100/70 p-6 items-center justify-center">
        <div className="max-w-sm text-center">
          <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 text-slate-800">Gemini API Key Required</h3>
          <p className="text-sm text-slate-600 mb-4">
            Please provide your Google Gemini API key to activate the AI assistant.
          </p>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Paste your API Key here"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && tempApiKey.trim()) { saveApiKey(tempApiKey.trim()) }}}
            />
            <Button onClick={() => { if (tempApiKey.trim()) { saveApiKey(tempApiKey.trim()) }}} disabled={isSaving || !tempApiKey.trim()}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save'}
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            You can get one from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline font-medium">Google AI Studio</a>. Your key is stored securely in your user profile.
          </p>
        </div>
      </div>
    );
  }

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
          {getRemainingTokens() === Infinity ? 'Unlimited' : `${getRemainingTokens()} tokens left`}
        </Badge>
      </header>

      {/* Chat Feed */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-1 px-2 sm:px-6 pt-4 pb-1 transition-all" role="log" aria-live="polite">
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            <ChatMessageBubble
              type={message.type}
              content={message.content}
              timestamp={message.timestamp}
              isStreaming={message.isStreaming}
            />
            {message.suggestions && (
              <div className="flex flex-wrap items-center justify-start gap-2 px-12 py-2 animate-fade-in">
                {message.suggestions.map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center gap-2 rounded-full hover:bg-slate-200/70 border-slate-200 text-slate-600 transition-all text-xs"
                  >
                    <Bolt className="h-3 w-3 text-purple-500" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
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
          disabled={getRemainingTokens() === 0 || !apiKey}
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
          disabled={!input.trim() || getRemainingTokens() === 0 || !apiKey}
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
