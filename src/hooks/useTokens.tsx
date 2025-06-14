
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TokenUsage {
  userId: string;
  tokensUsed: number;
  tokensLimit: number;
  planType: 'free' | 'premium';
  lastReset: string;
}

export const useTokens = () => {
  const [tokens, setTokens] = useState<TokenUsage>({
    userId: 'demo-user',
    tokensUsed: 0,
    tokensLimit: 10, // Changed from 5 to 10 for free users
    planType: 'free',
    lastReset: new Date().toISOString(),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if tokens need to reset (monthly)
    const lastReset = new Date(tokens.lastReset);
    const now = new Date();
    const shouldReset = now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear();
    
    if (shouldReset && tokens.planType === 'free') {
      setTokens(prev => ({
        ...prev,
        tokensUsed: 0,
        lastReset: now.toISOString(),
      }));
    }
  }, [tokens.lastReset, tokens.planType]);

  const consumeTokens = async (amount: number = 1) => {
    if (tokens.planType === 'premium') return true;
    
    if (tokens.tokensUsed + amount > tokens.tokensLimit) {
      return false;
    }

    setTokens(prev => ({
      ...prev,
      tokensUsed: prev.tokensUsed + amount,
    }));

    return true;
  };

  const getRemainingTokens = () => {
    if (tokens.planType === 'premium') return Infinity;
    return Math.max(0, tokens.tokensLimit - tokens.tokensUsed);
  };

  return {
    tokens,
    isLoading,
    consumeTokens,
    getRemainingTokens,
    setTokens,
  };
};
