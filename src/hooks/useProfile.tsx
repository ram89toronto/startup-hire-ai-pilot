
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

const fetchUserProfile = async (session: Session | null) => {
    if (!session?.user) {
        return null;
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
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    return useQuery({
        queryKey: ['userProfile', session?.user?.id],
        queryFn: () => fetchUserProfile(session),
        enabled: !!session?.user,
    });
};
