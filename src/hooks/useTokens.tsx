
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useProfile } from './useProfile';

export const useTokens = () => {
    const queryClient = useQueryClient();
    const { data: profile, isLoading } = useProfile();

    const consumeTokensMutation = useMutation({
        mutationFn: async ({ amount = 1 }: { amount: number }) => {
            if (!profile) throw new Error("Profile not loaded");
            const newTokensUsed = profile.tokens_used + amount;
            const { error } = await supabase
                .from('profiles')
                .update({ tokens_used: newTokensUsed })
                .eq('id', profile.id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
        onError: (error) => {
            toast.error("Failed to update token count.");
            console.error(error);
        }
    });

    useEffect(() => {
        if (profile) {
            const lastReset = new Date(profile.tokens_last_reset);
            const now = new Date();
            const shouldReset = now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear();

            if (shouldReset && profile.subscription_tier?.toLowerCase() !== 'premium') {
                supabase
                    .from('profiles')
                    .update({ tokens_used: 0, tokens_last_reset: now.toISOString() })
                    .eq('id', profile.id)
                    .then(({ error }) => {
                        if (error) {
                            console.error("Error resetting tokens", error);
                        } else {
                            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
                            toast.info("Your free tokens have been reset for the month!");
                        }
                    });
            }
        }
    }, [profile, queryClient]);


    const consumeTokens = async (amount: number = 1) => {
        if (!profile) return false;
        if (profile.subscription_tier?.toLowerCase() === 'premium') return true;

        if (profile.tokens_used + amount > profile.tokens_limit) {
            toast.error("Not enough tokens.");
            return false;
        }

        try {
            await consumeTokensMutation.mutateAsync({ amount });
            return true;
        } catch {
            return false;
        }
    };

    const getRemainingTokens = () => {
        if (!profile) return 0;
        if (profile.subscription_tier?.toLowerCase() === 'premium') return Infinity;
        return Math.max(0, profile.tokens_limit - profile.tokens_used);
    };

    const tokens = profile ? {
        userId: profile.id,
        tokensUsed: profile.tokens_used,
        tokensLimit: profile.tokens_limit,
        planType: profile.subscription_tier?.toLowerCase() === 'premium' ? 'premium' : 'free',
        lastReset: profile.tokens_last_reset,
    } : {
        userId: 'demo-user', // Fallback for logged-out or loading state
        tokensUsed: 0,
        tokensLimit: 10,
        planType: 'free',
        lastReset: new Date().toISOString(),
    };


    return {
        tokens,
        profile,
        isLoading,
        consumeTokens,
        getRemainingTokens,
    };
};
