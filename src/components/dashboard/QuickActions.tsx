
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Calendar, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      <Card className="saas-card hover:ring-2 ring-accent cursor-pointer" onClick={() => toast.info('Feature coming soon!')}>
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
      <Card className="saas-card hover:ring-2 ring-accent cursor-pointer" onClick={() => toast.info('Feature coming soon!')}>
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
      <Card className="saas-card hover:ring-2 ring-accent cursor-pointer" onClick={() => toast.info('Feature coming soon!')}>
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
  );
};
