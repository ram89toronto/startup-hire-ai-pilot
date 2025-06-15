import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Target, Clock, Plus, TrendingUp, TrendingDown, AlertTriangle, BarChart3 } from "lucide-react";

export const Dashboard = () => {
  const stats = [
    {
      title: "Total Candidates",
      value: "24",
      change: "+12%",
      trending: "up",
      icon: Users,
      color: "blue"
    },
    {
      title: "Interviews Scheduled",
      value: "8",
      change: "+8%",
      trending: "up",
      icon: Calendar,
      color: "teal"
    },
    {
      title: "Match Score Avg",
      value: "87%",
      change: "+15%",
      trending: "up",
      icon: Target,
      color: "purple"
    },
    {
      title: "Days to Hire",
      value: "4.2",
      change: "-23%",
      trending: "down",
      icon: Clock,
      color: "rose"
    }
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

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-primary">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary drop-shadow-sm font-primary">Hiring Dashboard</h1>
          <p className="text-muted-foreground mt-1">Active campaigns: 2 • Candidates in pipeline: 24</p>
        </div>
        <Button className="app-gradient-bg hover:brightness-110 text-white shadow-lg w-full sm:w-auto rounded-full font-primary font-semibold text-lg px-7 py-4">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
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
        ))}
      </div>
      {/* Active Campaigns */}
      <Card className="saas-card">
        <CardHeader>
          <CardTitle className="text-primary">Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 font-primary">
            <Users className="h-16 w-16 text-blue-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-2">No campaigns yet</h3>
            <p className="text-muted-foreground mb-6">Create your first hiring campaign to get started</p>
            <Button className="app-gradient-bg rounded-full text-white font-bold shadow hover:brightness-110 px-8 py-4">Create Campaign</Button>
          </div>
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
    </div>
  );
};
