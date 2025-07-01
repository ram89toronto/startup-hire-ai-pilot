
import { AlertTriangle } from "lucide-react";

type ErrorDisplayProps = {
  error: Error | null;
};

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-rose-200 bg-rose-50 p-12 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
        <AlertTriangle className="h-6 w-6 text-rose-500" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-rose-800">Oops, something went wrong!</h3>
      <p className="mt-2 text-sm text-rose-600">We couldn't load your dashboard data.</p>
      <p className="mt-1 text-xs text-muted-foreground">{error?.message}</p>
    </div>
  );
};
