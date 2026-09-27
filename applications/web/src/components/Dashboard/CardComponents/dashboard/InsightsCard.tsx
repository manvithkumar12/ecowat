import { useState } from "react";
import { useRecommendations } from "@/src/context/useRecommendations.Context";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import { Recommendation, AvoidRecommendation } from "@ecowat/shared";
import { ArrowRight, Sparkles } from "lucide-react";
import InsightPopup from "./Popups/InsightPopup";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const InsightsCard = () => {
  const { recommendations, AvoidAppliances, isLoading, isError, refetch } =
    useRecommendations();
  const [selectedItem, setSelectedItem] = useState<
    Recommendation | AvoidRecommendation | null
  >(null);
  const router = useRouter();
  const [popupType, setPopupType] = useState<"recommendation" | "avoid">(
    "recommendation",
  );
  const t = useTranslations("Dashboard.insights");

  return (
    <div className="xl:col-span-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm flex flex-col">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-emerald-500 fill-emerald-500/10" />
            {t("title")}
          </h3>
          <h5 className="text-[10px] ml-6">
            ({t("basedOn")}{" "}
            <a
              onClick={() => router.push("/appliances")}
              className="font-bold underline underline-offset-2 cursor-pointer text-slate-900 dark:text-stone-100"
            >
              {t("savedAppliances")}
            </a>
            )
          </h5>
          <p className="text-xs ml-6 text-slate-500 dark:text-slate-400 mt-0.5">
            {t("subtitle")}
          </p>
        </div>
        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          {recommendations.length} {t("activePlans")}
        </span>
      </div>

      <div className="space-y-4 flex-1">
        {recommendations.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-slate-50 dark:bg-[#161616] border border-slate-100 dark:border-[#222222] hover:border-emerald-500/20 hover:bg-slate-100/50 dark:hover:bg-[#1c1c1c] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="flex gap-3">
              <div className="h-9 w-9 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 shrink-0">
                {getApplianceIcon(item.category)}{" "}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {t("run")} {item.appliance} {t("between")} {item.bestTimeSlot}
                </p>
                {item.reasons?.[0] && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.reasons[0]}
                  </p>
                )}
                {item.reasons?.[1] && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.reasons[1]}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                {t("save")} {item.potentialSaving} €
              </span>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setPopupType("recommendation");
                }}
                className="h-7 w-7 rounded-lg border border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111111] hover:bg-slate-50 dark:hover:bg-[#1c1c1c] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer shadow-sm"
              >
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 flex-1 mt-4">
        {AvoidAppliances.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-rose-500/3 dark:bg-[#181212] border border-rose-100 dark:border-[#2a1a1a] hover:border-rose-500/20 hover:bg-rose-500/6 dark:hover:bg-[#201515] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="flex gap-3">
              <div className="h-9 w-9 bg-rose-500/10 rounded-lg flex items-center justify-center text-rose-500 shrink-0">
                {getApplianceIcon(item.category)}{" "}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {t("dontRun")} {item.appliance} {t("during")}{" "}
                  {item.avoidTimeSlot}
                </p>
                {item.reasons?.[0] && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.reasons[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-455 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                {t("penalty")}: {item.priceAtAvoidTime.toFixed(2)} €
              </span>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setPopupType("avoid");
                }}
                className="h-7 w-7 rounded-lg border border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111111] hover:bg-slate-50 dark:hover:bg-[#1c1c1c] flex items-center justify-center text-slate-400 hover:text-rose-500 dark:hover:text-white cursor-pointer shadow-sm"
              >
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <InsightPopup
          item={selectedItem}
          type={popupType}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default InsightsCard;
