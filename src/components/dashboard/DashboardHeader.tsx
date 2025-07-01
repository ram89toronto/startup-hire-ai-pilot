
import { Button } from "@/components/ui/button";
import { Plus, LogOut } from "lucide-react";
import { toast } from "sonner";
import { signOutWithCleanup, isDemoSession } from "@/utils/authUtils";

type DashboardHeaderProps = {
  isDemo: boolean;
  campaignCount: number;
  candidateCount: number;
  isLoading: boolean;
  isError: boolean;
};

export const DashboardHeader = ({ 
  isDemo, 
  campaignCount, 
  candidateCount, 
  isLoading, 
  isError 
}: DashboardHeaderProps) => {
  const handleLogout = async () => {
    await signOutWithCleanup();
    toast.success(isDemo ? 'Demo session ended' : 'Signed out successfully');
  };

  const handleCreateCampaign = () => {
    if (isDemo) {
      toast.info('This is a demo. In the full version, you can create real campaigns!');
    } else {
      toast.info('Campaign creation feature coming soon!');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary drop-shadow-sm font-primary">
          {isDemo ? 'Demo Dashboard' : 'Hiring Dashboard'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isLoading ? "Loading data..." : isError ? "Error loading data" : `Active campaigns: ${campaignCount} • Candidates in pipeline: ${candidateCount}`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          onClick={handleCreateCampaign}
          className="app-gradient-bg hover:brightness-110 text-white shadow-lg sm:w-auto rounded-full font-primary font-semibold text-lg px-7 py-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
        <Button onClick={handleLogout} variant="outline" className="rounded-full p-4 h-auto aspect-square">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
