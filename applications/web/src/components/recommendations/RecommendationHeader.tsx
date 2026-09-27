import React from "react";
import { Button } from "@/shadcn/ui/button";
import { RefreshCw, BarChart2 } from "lucide-react";

export default function RecommendationHeader() {
  return (
    <header className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
          Smart Recommendations
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
          AI-powered suggestions to reduce electricity costs and maximize
          renewable energy usage.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" className="flex items-center gap-2">
          <RefreshCw size={16} /> Refresh Recommendations
        </Button>
        <Button className="flex items-center gap-2">
          <BarChart2 size={16} /> View Forecast Data
        </Button>
      </div>
    </header>
  );
}
