
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Campaign = {
  id: string;
  role_title: string;
  status: string;
  created_at: string;
  department?: string;
};

type CampaignsSectionProps = {
  campaigns: Campaign[] | undefined;
  isLoading: boolean;
  isDemo: boolean;
};

export const CampaignsSection = ({ campaigns, isLoading, isDemo }: CampaignsSectionProps) => {
  const handleCreateCampaign = () => {
    if (isDemo) {
      toast.info('This is a demo. In the full version, you can create real campaigns!');
    } else {
      toast.info('Campaign creation feature coming soon!');
    }
  };

  return (
    <Card className="saas-card">
      <CardHeader>
        <CardTitle className="text-primary">Active Campaigns</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && !isDemo ? (
          <div className="text-center py-12 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading campaigns...</span>
          </div>
        ) : campaigns && campaigns.length > 0 ? (
          <ul className="space-y-3">
            {campaigns.map(campaign => (
              <li key={campaign.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                <div>
                  <h3 className="font-semibold text-primary">{campaign.role_title}</h3>
                  <p className="text-sm text-muted-foreground">{campaign.department || 'No department'}</p>
                  {isDemo && <span className="text-xs text-blue-600 font-medium">Demo Data</span>}
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>{campaign.status}</Badge>
                  <Button variant="outline" size="sm" onClick={() => toast.info('Campaign details coming soon!')}>View</Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12 font-primary">
            <Users className="h-16 w-16 text-blue-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-2">No campaigns yet</h3>
            <p className="text-muted-foreground mb-6">Create your first hiring campaign to get started</p>
            <Button 
              onClick={handleCreateCampaign}
              className="app-gradient-bg rounded-full text-white font-bold shadow hover:brightness-110 px-8 py-4"
            >
              Create Campaign
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
