import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { Zap } from "lucide-react";
import React from "react";

const RecommendationCard = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex items-start gap-3 shadow-xs">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 cursor-pointer hover:bg-emerald-500/20 transition-colors">
            <Zap className="h-4 w-4" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={8} className="max-w-50">
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold">Optimization Suggestion</p>
            <p className="text-[11px] text-muted-foreground">
              Running appliances during this time may reduce costs and increase
              renewable energy usage.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
      <div className="space-y-1">
        <h4 className="text-[12px] font-bold text-foreground">
          Smart Recommendation
        </h4>
        <p className="text-[12px] text-muted-foreground leading-normal">
          Run dishwasher between 2 PM and 4 PM for lower cost and higher
          renewable energy availability.
        </p>
      </div>
    </div>
  );
};

export default RecommendationCard;
