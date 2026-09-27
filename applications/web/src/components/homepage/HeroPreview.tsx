import { Zap, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import EstCost from "./EstCost";
import RenewableCard from "./RenewableCard";
import RecommendationCard from "./RecommendationCard";

const FORECAST_POINTS = [
  {
    svgX: 80,
    svgY: 55,
    day: "Monday",
    kwh: 21,
    label: "Mon",
    detail: "Status: Normal Consumption",
  },
  {
    svgX: 148,
    svgY: 38,
    day: "Tuesday",
    kwh: 24,
    label: "Tue",
    detail: "Change: +14% from Monday",
  },
  {
    svgX: 216,
    svgY: 65,
    day: "Wednesday",
    kwh: 22,
    label: "Wed",
    detail: "Status: Stable Usage",
  },
  {
    svgX: 284,
    svgY: 24,
    day: "Thursday",
    kwh: 27,
    label: "Thu",
    detail: "Status: Highest Forecast Day",
  },
  {
    svgX: 352,
    svgY: 42,
    day: "Friday",
    kwh: 25,
    label: "Fri",
    detail: "Status: Weekend Preparation",
  },
];

export function HeroPreview() {
  return (
    <div className="lg:col-span-5 w-full flex flex-col space-y-4">
      <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-foreground">
              Energy Forecast cncncncn
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Next 7 Days Prediction
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            Forecast Ready
          </span>
        </div>

        <div
          className="relative w-full border-b border-border/40 pt-2"
          style={{ height: "112px" }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 400 90"
            preserveAspectRatio="xMidYMid meet"
          >
            <line
              x1="0"
              y1="30"
              x2="400"
              y2="30"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="4,4"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="0"
              y1="60"
              x2="400"
              y2="60"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="4,4"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="M 0 78 C 40 50 80 55 148 38 S 216 65 284 24 S 352 42 400 34"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            {FORECAST_POINTS.map((pt) => (
              <Tooltip key={pt.day}>
                <TooltipTrigger asChild>
                  <circle
                    cx={pt.svgX}
                    cy={pt.svgY}
                    r="5"
                    fill="#10B981"
                    stroke="var(--card)"
                    strokeWidth="2"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    vectorEffect="non-scaling-stroke"
                  />
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6}>
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold">{pt.day}</p>
                    <p className="text-[11px] text-muted-foreground">
                      Forecast Usage: {pt.kwh} kWh
                    </p>
                    <p className="text-[11px] text-emerald-500">{pt.detail}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </svg>
        </div>

        <div className="grid grid-cols-5 gap-1 text-center pt-1">
          {FORECAST_POINTS.map((pt) => (
            <div key={pt.label}>
              <p className="text-[9px] font-semibold text-muted-foreground uppercase">
                {pt.label}
              </p>
              <p className="text-[11px] font-bold text-foreground mt-0.5">
                {pt.kwh} kWh
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EstCost />
        <RenewableCard />
      </div>
      <RecommendationCard />
      <p className="text-[10px] text-muted-foreground/50 text-center pt-1">
        Illustrative data only — not real energy or pricing information.
      </p>
    </div>
  );
}
