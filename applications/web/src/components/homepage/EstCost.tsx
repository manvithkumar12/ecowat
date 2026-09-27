import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { Info } from "lucide-react";
import React from "react";

const EstCost = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex flex-col justify-between space-y-3 shadow-xs">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-[12px] font-semibold text-muted-foreground">
            Estimated Cost
          </h4>
          <p className="text-2xl font-extrabold text-foreground mt-1.5">
            €3.42
            <span className="text-xs font-normal text-muted-foreground">
              /day
            </span>
          </p>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-pointer mt-0.5"
              aria-label="Cost info"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={6} className="max-w-50">
            <div className="space-y-0.5">
              <p className="text-[11px] font-bold">Estimated Daily Cost</p>
              <p className="text-[11px] text-muted-foreground">
                Based on average household energy consumption and forecasted
                electricity prices.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 w-fit">
        ↓ 18% lower than average
      </span>
    </div>
  );
};

export default EstCost;
