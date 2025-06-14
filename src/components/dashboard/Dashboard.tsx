
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
      color: "green"
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
      color: "orange"
    }
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600"
    };
    return colors[color as keyof typeof colors] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Hiring Dashboard</h1>
          <p className="text-slate-600 mt-1">Active campaigns: 2 • Candidates in pipeline: 24</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatColor(stat.color)}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {stat.trending === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-600" />
                  )}
                  <span className="text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No campaigns yet</h3>
            <p className="text-slate-600 mb-6">Create your first hiring campaign to get started</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Generate Interview Kit</h3>
                <p className="text-sm text-slate-600">Create AI-powered interview materials</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Schedule Interviews</h3>
                <p className="text-sm text-slate-600">Manage your interview pipeline</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">View Analytics</h3>
                <p className="text-sm text-slate-600">Track hiring performance metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
