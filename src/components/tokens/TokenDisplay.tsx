
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Crown, RefreshCw } from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';

export const TokenDisplay = () => {
  const { tokens, getRemainingTokens } = useTokens();
  const remaining = getRemainingTokens();
  const isLowTokens = remaining <= 2 && tokens.planType === 'free';

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {tokens.planType === 'premium' ? (
                <Crown className="h-5 w-5 text-yellow-500" />
              ) : (
                <Zap className="h-5 w-5 text-blue-500" />
              )}
              <span className="font-semibold text-slate-700">
                {tokens.planType === 'premium' ? 'Premium' : 'Free Plan'}
              </span>
            </div>
            
            <Badge variant={isLowTokens ? 'destructive' : 'secondary'} className="px-3 py-1">
              {tokens.planType === 'premium' 
                ? '∞ Unlimited' 
                : `${remaining}/${tokens.tokensLimit} tokens`
              }
            </Badge>
          </div>

          {tokens.planType === 'free' && (
            <div className="flex gap-2">
              {isLowTokens && (
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <Crown className="h-4 w-4 mr-1" />
                  Upgrade
                </Button>
              )}
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Resets Monthly
              </Button>
            </div>
          )}
        </div>
        
        {tokens.planType === 'free' && (
          <div className="mt-3">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  isLowTokens ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${((tokens.tokensLimit - remaining) / tokens.tokensLimit) * 100}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Each AI generation, PDF export, and search uses 1 token
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
