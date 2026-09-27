import { renderFormattedText } from "@/src/utils/ecky/render";
import { AlertTriangle, Info } from "lucide-react";
import { useUserUsage } from "./utils/getUserUsage";
import AppliancesCards from "@/src/components/Dashboard/Tracker/sections/AppliancesCards";
import Link from "next/link";
import { UserAppliancesProvider } from "@/src/context/userAppliances";
import SavedAppliances from "./utils/sections/SavedAppliances";
import { RecommendationsProvider } from "@/src/context/useRecommendations.Context";
import RecommendationSection from "./utils/sections/RecommendationSection";
import { LivePriceProvider } from "@/src/context/usePriceData";
import { RenewableProvider } from "@/src/context/useRenewable.context";
import LivePrice from "./utils/sections/livePrice";
import { WeeklyPriceProvider } from "@/src/context/useWeeklyUserPrice";
import ElectricityForecastSec from "./utils/sections/ElectricityForecastSec";
import { WeeklyConsumptionProvider } from "@/src/context/useWeekConsumption";
import ConsumptionForecast from "@/src/components/Dashboard/Charts/dashboard/ConsumptionForecast";
import { RenewableDataProvider } from "@/src/context/useRenewableData";
import RenewableForecastSec from "./utils/sections/RenewableForecastSec";

export type ReplyProps<T = any> = {
  isThinking?: boolean;
  text: string;
  parameters?: T;
  sources?: {
    sourceName: string;
    sourceUrl: string;
  }[];
  replyType?:
    | "usage_info"
    | "serp"
    | "user_schedules"
    | "price_today"
    | "ecowat"
    | "user_recommendations"
    | "allowed_appliances_info"
    | "predicted_price"
    | "saved_appliances_info"
    | "predicted_weekly_consumption"
    | "renewable_data";
};

export const UserQuery = ({ text }: ReplyProps) => {
  return (
    <div className="flex justify-end mr-2 w-full">
      <div className="text-xs sm:text-sm px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl rounded-tr-none bg-emerald-500 text-white shadow-sm font-medium w-fit max-w-[92%] sm:max-w-[85%] overflow-x-auto">
        <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export const AgentAnswer = ({ isThinking, text }: ReplyProps) => {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none ">
      {renderFormattedText(text)}
      {isThinking && (
        <span className="inline-block h-3.5 w-1.5 ml-1 bg-emerald-500 dark:bg-emerald-400 animate-pulse rounded-full" />
      )}
    </div>
  );
};


const LabelsInfo = {
  usage_info: {
    heading: "usage information",
    title: ({ date }: { date?: string }) => `Your appliance usage on ${date}`,
    subtitle: "Track your appliances usage here",
    linkLabel: "Track here",
    linkUrl: "/dashboard/tracker",
    fallback: "No appliances were used on this date.",
  },
  serp: {
    heading: "Ecky response",
    title: () => `Ecky response`,
    subtitle: "Sources:",
    linkLabel: "",
    linkUrl: "",
    fallback: "No sources found or used for this query",
  },
  ecowat: {
    heading: "About Ecowat",
    title: () => `About Ecowat`,
    subtitle: "Find more about ecowat on this documentation",
    linkLabel: "Docs",
    linkUrl: "/docs/installation",
    fallback: "No sources found or used for this query",
  },
  saved_appliances_info: {
    heading: "saved appliances",
    title: () => `Your Saved Appliances`,
    subtitle: "Manage and view your registered appliances",
    linkLabel: "Manage in Dashboard",
    linkUrl: "/dashboard/appliances",
    fallback: "No saved appliances found.",
  },
  user_recommendations: {
    heading: "Your recommendations",
    title: () => `Recommendations`,
    subtitle: "Track your Recommondations here",
    linkLabel: "Manage",
    linkUrl: "/recommendations",
    fallback: "No Recommendations found",
  },
  user_schedules: {
    heading: "Your schedules",
    title: () => `Your Schedules`,
    subtitle: "Track your schedules here",
    linkLabel: "Manage",
    linkUrl: "/schedules",
    fallback: "No Schedules found",
  },
  price_today: {
    heading: "Price Data",
    title: () => `Price Data`,
    subtitle: "You can Track Today's Prices here",
    linkLabel: "Track here",
    linkUrl: "/dashboard",
    fallback: "No Prices found",
  },
  allowed_appliances_info: {
    heading: "Allowed Appliances",
    title: () => `Allowed Appliances`,
    subtitle: "You can see Allowed appliances in ecowat here",
    linkLabel: "Track here",
    linkUrl: "/docs/Appliances",
    fallback: "No Prices found",
  },
  predicted_price: {
    heading: "Weekly Predicted Price",
    title: () => `Weekly Predicted Price`,
    subtitle: "You can see predicted prices for the upcoming week here",
    linkLabel: "Track here",
    linkUrl: "/dashboard",
    fallback: "No Prices found",
  },
  renewable_data: {
    heading: "Renewable Data",
    title: () => `Renewable Data`,
    subtitle: "You can see renewable data here",
    linkLabel: "Track here",
    linkUrl: "/dashboard",
    fallback: "No Prices found",
  },
};

export const UserUsageReply = ({
  text,
  isThinking,
  parameters,
  replyType,
}: ReplyProps) => {
  const labels = LabelsInfo[replyType as keyof typeof LabelsInfo];

  const usage = useUserUsage(parameters?.date);

  if (!labels) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {text && (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {renderFormattedText(text)}

          {isThinking && (
            <span className="inline-block h-3.5 w-1.5 ml-1 bg-emerald-500 dark:bg-emerald-400 animate-pulse rounded-full" />
          )}
        </div>
      )}

      <div className="mt-2 w-full max-w-2xl border border-blue-500/20 bg-blue-50/10 dark:bg-blue-950/5 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-none animate-fade-in text-slate-800 dark:text-slate-100">
        <div className="flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
            <Info className="h-5 w-5" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {typeof labels.title === "function"
                ? labels.title({ date: parameters?.date ?? "" })
                : labels.title}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              {labels.subtitle}

              <Link
                href={labels.linkUrl}
                className="text-blue-500 ml-2 hover:text-blue-600 underline underline-offset-3 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                {labels.linkLabel}
              </Link>
            </p>
          </div>
        </div>

        {replyType === "serp" && parameters?.url ? (
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {Array.isArray(parameters.url) ? (
              parameters.url.map((url: string, idx: number) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 pl-14 text-blue-500 hover:text-blue-600 underline break-all mb-2"
                >
                  Source Link {idx + 1}
                </a>
              ))
            ) : (
              <a
                href={parameters.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 pl-14 text-blue-500 hover:text-blue-600 underline break-all"
              >
                Visit source Link
              </a>
            )}
          </div>
        ) : null}

        {replyType === "usage_info" ? (
          usage.isLoading ? (
            <p className="text-sm text-slate-500 mt-3 dark:text-slate-400 animate-pulse">
              Loading {labels.heading}...
            </p>
          ) : usage.error ? (
            <p className="text-sm mt-3 text-red-500">
              Unable to fetch {labels.heading}.
            </p>
          ) : Array.isArray(usage.data?.data) ? (
            usage.data.data.length > 0 ? (
              <div className="w-full mt-3 overflow-x-auto">
                <div className="flex gap-2 items-center min-w-max">
                  <AppliancesCards
                    appliancesList={usage.data.data.slice(0, 2)}
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {labels.fallback}
              </p>
            )
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {labels.fallback}
            </p>
          )
        ) : null}

        {replyType === "saved_appliances_info" ? (
          <UserAppliancesProvider>
            <SavedAppliances applianceName={parameters?.appliance} />
          </UserAppliancesProvider>
        ) : null}

        {replyType === "user_recommendations" ? (
          <UserAppliancesProvider>
            <LivePriceProvider>
              <RenewableProvider>
                <RecommendationsProvider>
                  <RecommendationSection
                    applianceName={parameters?.appliance}
                  />
                </RecommendationsProvider>
              </RenewableProvider>
            </LivePriceProvider>
          </UserAppliancesProvider>
        ) : null}

        {replyType === "user_schedules" ? (
          <UserAppliancesProvider>
            <LivePriceProvider>
              <RenewableProvider>
                <RecommendationsProvider>
                  <RecommendationSection
                    applianceName={parameters?.appliance}
                  />
                </RecommendationsProvider>
              </RenewableProvider>
            </LivePriceProvider>
          </UserAppliancesProvider>
        ) : null}

        {replyType === "price_today" ? (
          <LivePriceProvider>
            <LivePrice />
          </LivePriceProvider>
        ) : null}

        {replyType === "predicted_price" ? (
          <WeeklyPriceProvider>
            <ElectricityForecastSec />
          </WeeklyPriceProvider>
        ) : null}

        {replyType === "predicted_weekly_consumption" ? (
          <WeeklyConsumptionProvider>
            <ConsumptionForecast />
          </WeeklyConsumptionProvider>
        ) : null}

        {replyType === "renewable_data" ? (
          <RenewableDataProvider>
            <RenewableForecastSec />
          </RenewableDataProvider>
        ) : null}
      </div>
    </div>
  );
};
