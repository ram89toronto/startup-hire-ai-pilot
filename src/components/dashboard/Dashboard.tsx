import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Target, Clock, Plus, TrendingUp, TrendingDown, AlertTriangle, BarChart3, LogOut, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardProps = {
  session: Session | null;
};

const StatCardSkeleton = () => (
  <Card className="saas-card">
    <CardContent className="p-6">
      <Skeleton className="h-14 w-14 rounded-full mb-4" />
      <Skeleton className="h-8 w-24 mb-1" />
      <Skeleton className="h-5 w-32" />
    </CardContent>
  </Card>
);

export const Dashboard = ({ session }: DashboardProps) => {

  const { 
    data: campaigns, 
    isLoading: isLoadingCampaigns, 
    isError: isErrorCampaigns,
    error: errorCampaigns 
  } = useQuery({
    queryKey: ['campaigns', session?.user?.id],
    queryFn: async () => {
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

  const stats = [
    { title: "Total Candidates", value: candidates?.length ?? 0, icon: Users, color: "blue", change: "+12%", trending: "up" },
    { title: "Interviews Scheduled", value: 8, icon: Calendar, color: "teal", change: "+8%", trending: "up" },
    { title: "Match Score Avg", value: "87%", icon: Target, color: "purple", change: "+15%", trending: "up" },
    { title: "Days to Hire", value: "4.2", icon: Clock, color: "rose", change: "-23%", trending: "down" }
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: "bg-blue-500/10 text-blue-700",
      teal: "bg-teal-400/10 text-teal-700",
      purple: "bg-violet-400/10 text-violet-700",
      rose: "bg-rose-400/10 text-rose-700"
    };
    return colors[color as keyof typeof colors] || "bg-gray-100 text-gray-600";
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-primary">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary drop-shadow-sm font-primary">Hiring Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            {isLoading ? "Loading data..." : isError ? "Error loading data" : `Active campaigns: ${campaigns?.length ?? 0} • Candidates in pipeline: ${candidates?.length ?? 0}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button className="app-gradient-bg hover:brightness-110 text-white shadow-lg sm:w-auto rounded-full font-primary font-semibold text-lg px-7 py-4">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
            <Button onClick={handleLogout} variant="outline" className="rounded-full p-4 h-auto aspect-square">
                <LogOut className="h-5 w-5" />
            </Button>
        </div>
      </div>

      {isError ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-rose-200 bg-rose-50 p-12 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                <AlertTriangle className="h-6 w-6 text-rose-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-rose-800">Oops, something went wrong!</h3>
            <p className="mt-2 text-sm text-rose-600">We couldn't load your dashboard data.</p>
            <p className="mt-1 text-xs text-muted-foreground">{error?.message}</p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
            ) : (
                stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="saas-card hover:brightness-105 hover:scale-[1.025] transition-all duration-200 font-primary"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm ${getStatColor(stat.color)}`}>
                          <stat.icon className="h-7 w-7" />
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          {stat.trending === "up" ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-rose-500" />
                          )}
                          <span className={`ml-1 font-bold ${stat.trending === "up" ? "text-green-600" : "text-rose-600"}`}>{stat.change}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
                        <div className="text-md text-muted-foreground">{stat.title}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
          {/* Active Campaigns */}
          <Card className="saas-card">
            <CardHeader>
              <CardTitle className="text-primary">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
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
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>{campaign.status}</Badge>
                                    <Button variant="outline" size="sm">View</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                  <div className="text-center py-12 font-primary">
                    <Users className="h-16 w-16 text-blue-200 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-primary mb-2">No campaigns yet</h3>
                    <p className="text-muted-foreground mb-6">Create your first hiring campaign to get started</p>
                    <Button className="app-gradient-bg rounded-full text-white font-bold shadow hover:brightness-110 px-8 py-4">Create Campaign</Button>
                  </div>
                )}
            </CardContent>
          </Card>
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <Card className="saas-card hover:ring-2 ring-accent cursor-pointer">
              <CardContent className="p-6 flex items-center gap-3">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-7 w-7 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg text-primary mb-1">Generate Interview Kit</h3>
                  <p className="text-sm text-muted-foreground">Create AI-powered interview materials</p>
                </div>
              </CardContent>
            </Card>
            <Card className="saas-card hover:ring-2 ring-accent cursor-pointer">
              <CardContent className="p-6 flex items-center gap-3">
                <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg text-accent mb-1">Schedule Interviews</h3>
                  <p className="text-sm text-muted-foreground">Manage your interview pipeline</p>
                </div>
              </CardContent>
            </Card>
            <Card className="saas-card hover:ring-2 ring-accent cursor-pointer">
              <CardContent className="p-6 flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg text-green-700 mb-1">View Analytics</h3>
                  <p className="text-sm text-muted-foreground">Track hiring performance metrics</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
