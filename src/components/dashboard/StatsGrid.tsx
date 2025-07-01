
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Calendar, Target, Clock, TrendingUp, TrendingDown } from "lucide-react";

type StatCardSkeletonProps = {};

const StatCardSkeleton = () => (
  <Card className="saas-card">
    <CardContent className="p-6">
      <Skeleton className="h-14 w-14 rounded-full mb-4" />
      <Skeleton className="h-8 w-24 mb-1" />
      <Skeleton className="h-5 w-32" />
    </CardContent>
  </Card>
);

type StatsGridProps = {
  candidateCount: number;
  isLoading: boolean;
  isDemo: boolean;
};

export const StatsGrid = ({ candidateCount, isLoading, isDemo }: StatsGridProps) => {
  const stats = [
    { title: "Total Candidates", value: candidateCount, icon: Users, color: "blue", change: "+12%", trending: "up" },
    { title: "Interviews Scheduled", value: isDemo ? 8 : 8, icon: Calendar, color: "teal", change: "+8%", trending: "up" },
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {isLoading && !isDemo ? (
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
  );
};
