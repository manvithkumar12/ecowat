import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import React from "react";

const RenewableCard = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex flex-col justify-between space-y-3 shadow-xs">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-[12px] font-semibold text-muted-foreground">
            Renewable Window
          </h4>
          <p className="text-[14px] font-extrabold text-foreground mt-1.5">
            2:00 PM – 4:00 PM
          </p>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="h-2.5 w-2.5 rounded-full bg-emerald-500 mt-1 cursor-pointer hover:scale-125 transition-transform"
              aria-label="Renewable window info"
            />
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={6} className="max-w-50">
            <div className="space-y-0.5">
              <p className="text-[11px] font-bold">
                Best Renewable Energy Window
              </p>
              <p className="text-[11px] text-muted-foreground">2 PM – 4 PM</p>
              <p className="text-[11px] text-muted-foreground">
                High solar and wind generation expected during this period.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <p className="text-[11px] text-emerald-500 font-semibold">
        82% Renewable Energy
      </p>
    </div>
  );
};

export default RenewableCard;
