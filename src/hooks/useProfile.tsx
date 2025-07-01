
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { isDemoSession, getDemoUser } from '@/utils/authUtils';

const fetchUserProfile = async (session: Session | null) => {
    if (!session?.user) {
        return null;
    }

    // Handle demo users
    if (isDemoSession()) {
        const demoUser = getDemoUser();
        return {
            id: demoUser?.id || 'demo-user-id',
            full_name: demoUser?.full_name || 'Demo User',
            email: demoUser?.email || 'demo@example.com',
            company: 'Demo Company',
            avatar_url: null,
            subscription_tier: 'Free',
            tokens_used: 0,
            tokens_limit: 10,
            tokens_last_reset: new Date().toISOString(),
            created_at: new Date().toISOString(),
            gemini_api_key: null
        };
    }

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116: row not found, which is fine
        console.error('Error fetching profile:', error);
        throw error;
    }
    return data;
};

export const useProfile = () => {
    const [session, setSession] = useState<Session | null>(null);
    
    useEffect(() => {
        // Check for demo session first
        if (isDemoSession()) {
            const demoUser = getDemoUser();
            setSession({
                user: demoUser,
                access_token: 'demo-token',
                expires_at: Date.now() + 3600000,
            } as any);
            return;
        }

        // Handle real Supabase sessions
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    return useQuery({
        queryKey: ['userProfile', session?.user?.id, isDemoSession()],
        queryFn: () => fetchUserProfile(session),
        enabled: !!session?.user,
    });
};
