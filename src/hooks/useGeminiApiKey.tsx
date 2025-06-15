
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useProfile } from './useProfile';

const updateApiKey = async (newKey: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) throw new Error("Not authenticated");
    const { error } = await supabase
        .from('profiles')
        .update({ gemini_api_key: newKey })
        .eq('id', session.user.id);
    if (error) throw error;
};

export const useGeminiApiKey = () => {
    const queryClient = useQueryClient();
    const { data: profile, isLoading: isProfileLoading } = useProfile();

    const apiKey = profile?.gemini_api_key || null;

    const saveMutation = useMutation({
        mutationFn: (newKey: string) => updateApiKey(newKey),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            toast.success("API key saved successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to save API key.");
        }
    });

    const removeMutation = useMutation({
        mutationFn: () => updateApiKey(''),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            toast.success("API key removed successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to remove API key.");
        }
    });

    return {
        apiKey,
        isLoading: isProfileLoading,
        saveApiKey: saveMutation.mutate,
        isSaving: saveMutation.isPending,
        removeApiKey: removeMutation.mutate,
        isRemoving: removeMutation.isPending,
    };
};
