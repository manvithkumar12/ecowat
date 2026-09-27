"use client";
"use no memo";
import { useState, useEffect, useMemo } from "react";
import { useAddSchedule } from "@ecowat/shared";
import { toast } from "sonner";
import { RescheduledApplicationItem } from "./types";
import UpcomingSection from "./components/UpcomingSection";
import PendingSection from "./components/PendingSection";
import CompletedSection from "./components/CompletedSection";
import Scheduleheader from "./components/Scheduleheader";
import SectionButtons from "./components/SectionButtons";
import { useUserAppliancesContext } from "@/src/context/userAppliances";
import { useRecommendations } from "@/src/context/useRecommendations.Context";
import { handleGenerateSchedule } from "@/src/utils/appliances/AiScheduler";
import { parseTimeStr, updateTime } from "@/src/utils/appliances/updateTime";
import { UserScheduleData } from "@/src/context/useScheduleContext";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ScheduleClient() {
  const tToasts = useTranslations("Schedule.toasts");
  const tErrors = useTranslations("Schedule.errors");

  const {
    recommendations: recAppliances,
    isLoading: recLoading,
    isError: recError,
    refetch: recFetch,
  } = useRecommendations();
  const {
    Schedule: schedluedAppliances,
    isScheduleLoading,
    isScheduleError,
    scheduleRefetch,
  } = UserScheduleData();
  const {
    data: appliancesQuery,
    isLoading: applianceLoading,
    isError: applianceError,
    refetch: applianceFetch,
  } = useUserAppliancesContext();
  const addMutuation = useAddSchedule();
  const [germanTimeStr, setGermanTimeStr] = useState<string>("");
  const [germanDateStr, setGermanDateStr] = useState<string>("");
  const [currentHour, setCurrentHour] = useState<number>(12);
  const [schedules, setSchedules] = useState<RescheduledApplicationItem[]>([]);
  const [activeSection, setActiveSection] = useState<
    "upcoming" | "pending" | "completed"
  >("upcoming");
  const [rescheduleItem, setRescheduleItem] =
    useState<RescheduledApplicationItem | null>(null);
  const [selectedSuggestionIdx, setSelectedSuggestionIdx] = useState<number>(0);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [removedIds, setRemovedIds] = useState<number[]>([]);

  const handleGenerateScheduleAi = useMemo(
    () =>
      handleGenerateSchedule(
        recAppliances,
        appliancesQuery,
        addMutuation,
        toast,
        tToasts("generatedSuccess"),
        tToasts("generatedFail"),
      ),
    [recAppliances, appliancesQuery, addMutuation, tToasts],
  );

  const formatHour = (h: number) => {
    const hour = Math.floor(h);
    const minute = Math.round((h - hour) * 60);
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };

  useEffect(() => {
    updateTime({ setGermanDateStr, setGermanTimeStr, setCurrentHour });
    const interval = setInterval(() => {
      updateTime({ setGermanDateStr, setGermanTimeStr, setCurrentHour });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (schedluedAppliances?.data) {
      setSchedules(schedluedAppliances.data);
    }
  }, [schedluedAppliances?.data]);

  const handleRemoveSchedule = (id: string) => {
    setRemovedIds((prev) => [...prev, Number.parseInt(id)]);
    toast.error(tToasts("removed"));
  };

  const triggerReschedule = (item: RescheduledApplicationItem) => {
    setRescheduleItem(item);
    setSelectedSuggestionIdx(0);
  };

  const groupedSchedules = useMemo(() => {
    const upcoming: RescheduledApplicationItem[] = [];
    const pending: RescheduledApplicationItem[] = [];
    const completed: RescheduledApplicationItem[] = [];

    schedules.forEach((item) => {
      if (!item) return;
      if (removedIds.includes(item.id)) return;
      if (completedIds.includes(item.id)) {
        completed.push(item);
      } else {
        const startHourNum = parseTimeStr(item.startHour);
        const isCurrentOrFuture = currentHour < startHourNum;
        if (isCurrentOrFuture) {
          upcoming.push(item);
        } else {
          pending.push(item);
        }
      }
    });
    return { upcoming, pending, completed };
  }, [schedules, currentHour, completedIds, removedIds]);

  const isLoading = isScheduleLoading || applianceLoading || recLoading;
  const isError = isScheduleError || applianceError || recError;

  const handleRetryAll = () => {
    if (isScheduleError) scheduleRefetch();
    if (applianceError) applianceFetch();
    if (recError) recFetch();
  };

  // ── Loading skeleton ──────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-8 w-full max-w-full min-w-0 animate-pulse">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-4 sm:p-6 rounded-2xl">
          <div className="space-y-2">
            <div className="h-6 w-56 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-4 w-80 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-14 w-36 bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
            <div className="h-9 w-36 bg-emerald-200 dark:bg-emerald-900/40 rounded-lg" />
          </div>
        </div>

        {/* Section buttons skeleton */}
        <div className="flex gap-3 pb-5 border-b border-slate-100 dark:border-stone-900/50">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-9 w-28 bg-slate-100 dark:bg-slate-800/60 rounded-lg"
            />
          ))}
        </div>

        {/* Cards skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-white dark:bg-[#111111] border border-slate-100 dark:border-[#1e1e1e] rounded-xl"
            >
              <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800/60 rounded" />
              </div>
              <div className="h-8 w-20 bg-slate-100 dark:bg-slate-800/60 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────
  if (isError) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-100">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
              {tErrors("failedTitle")}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isScheduleError && tErrors("fetchSchedules")}
              {applianceError && tErrors("loadAppliances")}
              {recError && tErrors("loadRecs")}
              {tErrors("retrySuffix")}
            </p>
          </div>
          <button
            onClick={handleRetryAll}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            {tErrors("retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-full min-w-0">
      <Scheduleheader
        germanDateStr={germanDateStr}
        germanTimeStr={germanTimeStr}
      />
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-slate-100 dark:border-stone-900/50 pb-5 w-full min-w-0">
        <SectionButtons
          groupedSchedules={groupedSchedules}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      <div className="min-h-100 w-full min-w-0">
        {activeSection === "upcoming" && (
          <UpcomingSection
            schedules={groupedSchedules.upcoming}
            currentHour={currentHour}
            formatHour={formatHour}
            triggerReschedule={triggerReschedule}
            handleGenerateSchedule={handleGenerateScheduleAi}
            showGenerateBtn={schedules.length === 0}
          />
        )}

        {activeSection === "pending" && (
          <PendingSection
            schedules={groupedSchedules.pending}
            setCompletedIds={setCompletedIds}
            formatHour={formatHour}
            handleRemoveSchedule={handleRemoveSchedule}
          />
        )}

        {activeSection === "completed" && (
          <CompletedSection
            schedules={groupedSchedules.completed}
            formatHour={formatHour}
          />
        )}
      </div>
    </div>
  );
}
