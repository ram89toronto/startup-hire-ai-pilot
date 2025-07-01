
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { isDemoSession } from "@/utils/authUtils";
import { DashboardHeader } from "./DashboardHeader";
import { StatsGrid } from "./StatsGrid";
import { CampaignsSection } from "./CampaignsSection";
import { QuickActions } from "./QuickActions";
import { ErrorDisplay } from "./ErrorDisplay";

type DashboardProps = {
  session: Session | null;
};

export const Dashboard = ({ session }: DashboardProps) => {
  const isDemo = isDemoSession();

  const { 
    data: campaigns, 
    isLoading: isLoadingCampaigns, 
    isError: isErrorCampaigns,
    error: errorCampaigns 
  } = useQuery({
    queryKey: ['campaigns', session?.user?.id],
    queryFn: async () => {
      if (isDemo) {
        // Return demo data for demo users
        return [
          {
            id: 'demo-campaign-1',
            role_title: 'Senior Frontend Developer',
            status: 'active',
            created_at: new Date().toISOString(),
            department: 'Engineering'
          },
          {
            id: 'demo-campaign-2',
            role_title: 'Product Manager',
            status: 'active',
            created_at: new Date().toISOString(),
            department: 'Product'
          }
        ];
      }

      const { data, error } = await supabase
        .from('hiring_campaigns')
        .select('id, role_title, status, created_at, department')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching campaigns:", error);
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const campaignIds = campaigns?.map(c => c.id) || [];

  const { 
    data: candidates, 
    isLoading: isLoadingCandidates,
    isError: isErrorCandidates,
    error: errorCandidates
  } = useQuery({
    queryKey: ['candidates', campaignIds],
    queryFn: async () => {
      if (isDemo) {
        // Return demo data for demo users
        return [
          { id: 'demo-candidate-1' },
          { id: 'demo-candidate-2' },
          { id: 'demo-candidate-3' },
          { id: 'demo-candidate-4' },
          { id: 'demo-candidate-5' }
        ];
      }

      if (campaignIds.length === 0) return [];
      const { data, error } = await supabase
          .from('candidates')
          .select('id')
          .in('campaign_id', campaignIds);

      if (error) {
          console.error("Error fetching candidates:", error);
          throw new Error(error.message);
      }
      return data;
    },
    enabled: !isLoadingCampaigns && campaignIds.length > 0 && !isErrorCampaigns,
  });

  const isLoading = isLoadingCampaigns || (!isErrorCampaigns && isLoadingCandidates);
  const isError = isErrorCampaigns || isErrorCandidates;
  const error = errorCampaigns || errorCandidates;

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-primary">
      <DashboardHeader
        isDemo={isDemo}
        campaignCount={campaigns?.length ?? 0}
        candidateCount={candidates?.length ?? 0}
        isLoading={isLoading}
        isError={isError}
      />

      {isError && !isDemo ? (
        <ErrorDisplay error={error} />
      ) : (
        <>
          <StatsGrid
            candidateCount={candidates?.length ?? 0}
            isLoading={isLoading}
            isDemo={isDemo}
          />
          
          <CampaignsSection
            campaigns={campaigns}
            isLoading={isLoading}
            isDemo={isDemo}
          />
          
          <QuickActions />
        </>
      )}
    </div>
  );
};
