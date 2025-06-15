
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-800 drop-shadow-sm">Hiring Dashboard</h1>
          <p className="text-slate-700 mt-1">Active campaigns: 2 • Candidates in pipeline: 24</p>
        </div>
        <Button className="bg-blue-700 hover:bg-blue-800 text-white shadow-lg w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-white via-sky-50 to-blue-50 border border-blue-100 hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${getStatColor(stat.color)}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {stat.trending === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`font-medium ${stat.trending === "up" ? "text-green-600" : "text-red-600"}`}>{stat.change}</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
                <div className="text-sm text-slate-700">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Campaigns */}
      <Card className="border border-blue-100 bg-white/95 shadow">
        <CardHeader>
          <CardTitle className="text-blue-700">Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-blue-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">No campaigns yet</h3>
            <p className="text-slate-700 mb-6">Create your first hiring campaign to get started</p>
            <Button className="bg-blue-700 hover:bg-blue-800 text-white shadow">
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <Card className="bg-gradient-to-br from-blue-100 to-blue-50/70 border-blue-200 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-blue-900 mb-1">Generate Interview Kit</h3>
                <p className="text-sm text-slate-700">Create AI-powered interview materials</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-100 to-purple-50/70 border-purple-200 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-purple-900 mb-1">Schedule Interviews</h3>
                <p className="text-sm text-slate-700">Manage your interview pipeline</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-100 to-green-50/70 border-green-200 hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-green-900 mb-1">View Analytics</h3>
                <p className="text-sm text-slate-700">Track hiring performance metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

