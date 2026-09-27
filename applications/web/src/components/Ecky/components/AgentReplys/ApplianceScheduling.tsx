import { useEffect, useMemo, useState } from "react";
import { Zap, Clock, Calendar, Check, Loader2, Euro } from "lucide-react";
import { toast } from "sonner";
import {
  getApplianceTypeAppName,
  getApplianceTypeDbName,
  getArrayApplianceName,
} from "@/src/utils/appliances/applianceName";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import {
  calculateEndHour,
  handleScheduleClick,
} from "@/src/utils/ecky/applianceSchedule";
import { calculateDetailedUsage, useAddSchedule } from "@ecowat/shared";
import { ReplyProps } from "./AgentReplys";
import { renderFormattedText } from "@/src/utils/ecky/render";
import { useLivePrice } from "@/src/context/usePriceData";
import TimePicker from "@/src/utils/appliances/TimePicker";
import { isAlreadySaved } from "./utils/ApplianceAdding";
import SavedAppliances from "./utils/sections/SavedAppliances";
import { useUserAppliancesContext } from "@/src/context/userAppliances";

interface ApplianceScheduleCardProps {
  name: string;
  power?: number;
  usageHours?: number;
  startTime?: string;
  endTime?: string;
  hourlyData: any[];
  onScheduleSuccess?: () => void;
}

const SingleApplianceCard = ({
  name,
  power = 0,
  usageHours = 1,
  startTime: initialStartTime,
  endTime: initialEndTime,
  hourlyData,
}: ApplianceScheduleCardProps) => {
  const { mutate, isPending } = useAddSchedule();
  const [isScheduled, setIsScheduled] = useState(false);

  const [editPower, setEditPower] = useState<number>(power);
  const [editStartTime, setEditStartTime] = useState<string>(
    initialStartTime ?? "00:00",
  );
  const [editEndTime, setEditEndTime] = useState<string>(
    initialEndTime ??
      calculateEndHour(initialStartTime ?? "00:00", usageHours) ??
      "00:00",
  );

  useEffect(() => {
    setEditPower(power);
    setEditStartTime(initialStartTime ?? "00:00");
    setEditEndTime(
      initialEndTime ??
        calculateEndHour(initialStartTime ?? "00:00", usageHours) ??
        "00:00",
    );
  }, [power, initialStartTime, initialEndTime, usageHours]);

  const { duration, kwh, totalPrice } = useMemo(
    () =>
      calculateDetailedUsage(editPower, editStartTime, editEndTime, hourlyData),
    [editPower, editStartTime, editEndTime, hourlyData],
  );

  const { data: userAppliances } = useUserAppliancesContext();
  const category =
    getApplianceTypeAppName(name) || getApplianceTypeDbName(name);

  const handleSave = () => {
    const clean = name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const match = userAppliances?.find(
      (a: any) => a.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "") === clean,
    );
    const applianceId = match?.id ? Number(match.id) : 1;

    const editedParams = {
      id: applianceId,
      name,
      power: editPower || match?.powerRatingW || 1500,
      powerUnit: "W",
      time: editStartTime,
      startTime: editStartTime,
      endTime: editEndTime,
      usageHours: duration,
    };
    handleScheduleClick(mutate, setIsScheduled, editedParams as any);
  };

  return (
    <div className="mt-2 w-full max-w-sm sm:max-w-md border border-slate-150 dark:border-emerald-500/20 bg-slate-50/40 dark:bg-[#111] rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none animate-fade-in text-slate-800 dark:text-slate-100">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
          {getApplianceIcon(category || "default")}
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">
            {getArrayApplianceName(name)}
          </h4>
          <span className="text-[10px] font-semibold text-slate-400 dark:text-emerald-400/80 bg-slate-100/80 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {category || "Appliance"}
          </span>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="grid grid-cols-2 gap-2.5 border-t border-slate-100 dark:border-[#222] pt-3.5 mb-3.5">
        {/* Power */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold flex items-center gap-1">
            <Zap className="h-3 w-3 text-amber-500" />
            Power (W)
          </label>
          <input
            type="number"
            disabled={isScheduled || isPending}
            value={editPower}
            onChange={(e) => setEditPower(Number(e.target.value) || 0)}
            className="w-full text-xs font-bold font-mono px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2a2a2a] focus:border-emerald-500 focus:outline-none text-slate-800 dark:text-slate-100 disabled:opacity-60"
          />
        </div>

        {/* Duration (computed, read-only) */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold flex items-center gap-1">
            <Clock className="h-3 w-3 text-sky-500" />
            Duration
          </label>
          <div className="w-full text-xs font-bold font-mono px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-[#2a2a2a] text-slate-500 dark:text-slate-400">
            {duration.toFixed(2)} hrs
          </div>
        </div>

        {/* Start Time */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold flex items-center gap-1">
            <Calendar className="h-3 w-3 text-emerald-500" />
            Start Time
          </label>
          <TimePicker
            value={editStartTime}
            onChange={(value) => setEditStartTime(value as string)}
            disabled={isScheduled || isPending}
          />
        </div>

        {/* End Time */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold flex items-center gap-1">
            <Calendar className="h-3 w-3 text-emerald-500" />
            End Time
          </label>
          <TimePicker
            value={editEndTime}
            onChange={(value) => setEditEndTime(value as string)}
            disabled={isScheduled || isPending}
          />
        </div>
      </div>

      {/* Live Price Row */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-50/60 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 mb-3.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Euro className="h-3.5 w-3.5 text-emerald-500" />
          <span>Est. Cost</span>
          <span className="text-[10px] opacity-60">({kwh.toFixed(3)} kWh)</span>
        </div>
        <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
          €{typeof totalPrice === "number" ? totalPrice.toFixed(3) : "N/A"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Check className="h-4 w-4 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full p-0.5 text-emerald-500" />
          <span>Optimal schedule found</span>
        </div>

        {isScheduled ? (
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            <Check className="h-3.5 w-3.5 stroke-3" />
            <span>Scheduled</span>
          </div>
        ) : (
          <button
            type="button"
            disabled={isPending}
            onClick={handleSave}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-sm hover:shadow-emerald-500/20 transition-all duration-200 active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>Schedule Run</span>
          </button>
        )}
      </div>
    </div>
  );
};

export const ApplianceSchedule = ({
  parameters,
  isThinking,
  text,
}: ReplyProps) => {
  const hourlyData = useLivePrice().PriceData?.hourlyPrices || [];
  const {
    data: appliances,
    isLoading,
    isError,
    refetch,
  } = useUserAppliancesContext();
  if (!parameters) {
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {text && renderFormattedText(text)}
        {isThinking && (
          <span className="inline-block h-3.5 w-1.5 ml-1 bg-emerald-500 dark:bg-emerald-400 animate-pulse rounded-full" />
        )}
      </div>
    );
  }
  const items: Array<{
    name: string;
    power?: number;
    usageHours?: number;
    startTime?: string;
    endTime?: string;
  }> = [];

  if (Array.isArray(parameters)) {
    parameters.forEach((p) => {
      items.push({
        name: p?.name || "appliance",
        power: typeof p?.power === "number" ? p.power : 0,
        usageHours: typeof p?.usageHours === "number" ? p.usageHours : 1,
        startTime: p?.startTime ?? p?.time ?? "00:00",
        endTime: p?.endTime,
      });
    });
  } else if (
    Array.isArray(parameters.name) ||
    Array.isArray(parameters.names)
  ) {
    const rawNames: string[] = Array.isArray(parameters.names)
      ? parameters.names
      : parameters.name;

    rawNames.forEach((n, idx) => {
      const pwr = Array.isArray(parameters.power)
        ? parameters.power[idx]
        : parameters.power;
      const hours = Array.isArray(parameters.usageHours)
        ? parameters.usageHours[idx]
        : parameters.usageHours;
      const sTime = Array.isArray(parameters.startTime ?? parameters.time)
        ? (parameters.startTime ?? parameters.time)[idx]
        : (parameters.startTime ?? parameters.time);
      const eTime = Array.isArray(parameters.endTime)
        ? parameters.endTime[idx]
        : parameters.endTime;

      items.push({
        name: n,
        power: typeof pwr === "number" ? pwr : 0,
        usageHours: typeof hours === "number" ? hours : 1,
        startTime: sTime ?? "00:00",
        endTime: eTime,
      });
    });
  } else if (parameters.name || parameters.names) {
    const singleName = parameters.name || parameters.names;
    items.push({
      name: singleName,
      power: typeof parameters.power === "number" ? parameters.power : 0,
      usageHours:
        typeof parameters.usageHours === "number" ? parameters.usageHours : 1,
      startTime: parameters.startTime ?? parameters.time ?? "00:00",
      endTime: parameters.endTime,
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {text && (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {renderFormattedText(text)}
          {isThinking && (
            <span className="inline-block h-3.5 w-1.5 ml-1 bg-emerald-500 dark:bg-emerald-400 animate-pulse rounded-full" />
          )}
        </div>
      )}
      <div className="flex flex-col gap-3">
        {items.map((item, idx) =>
          isAlreadySaved(item.name, appliances) ? (
            <SingleApplianceCard
              key={`${item.name}-${idx}`}
              name={item.name}
              power={item.power}
              usageHours={item.usageHours}
              startTime={item.startTime}
              endTime={item.endTime}
              hourlyData={hourlyData}
            />
          ) : null,
        )}
      </div>
    </div>
  );
};

export interface cancelProps {
  parameters: {
    name: string[];
  };
  isThinking: boolean;
  text: string;
}

export const CancelScheduling = ({
  parameters,
  isThinking,
  text,
}: cancelProps & ReplyProps) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  if (!parameters) {
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {text && renderFormattedText(text)}
        {isThinking && (
          <span className="inline-block h-3.5 w-1.5 ml-1 bg-emerald-500 dark:bg-emerald-400 animate-pulse rounded-full" />
        )}
      </div>
    );
  }

  const handleDelete = () => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setIsDeleted(true);
      toast.success(`Schedule for ${parameters.name} canceled successfully!`);
    }, 800);
  };

  const category = getApplianceTypeAppName(parameters.name);

  return (
    <div className="flex flex-col gap-3">
      {text && (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            Are you sure want to cancel the schedule for{" "}
            <b> {parameters.name}?</b>
          </p>
          {isThinking && (
            <span className="inline-block h-3.5 w-1.5 ml-1 bg-emerald-500 dark:bg-emerald-400 animate-pulse rounded-full" />
          )}
        </div>
      )}

      <div className="mt-2 w-full max-w-sm sm:max-w-md border border-red-500/20 bg-red-50/10 dark:bg-red-950/5 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-none animate-fade-in text-slate-800 dark:text-slate-100">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="h-10 w-10 rounded-xl bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400 flex items-center justify-center border border-red-500/20 shrink-0">
            {getApplianceIcon(category || "default")}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">
              {parameters.name}
            </h4>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {category || "Appliance"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-slate-100 dark:border-[#222] pt-4 mt-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
            <Loader2 className="h-4 w-4 text-red-500 animate-pulse shrink-0" />
            <span>Active Schedule</span>
          </div>

          {isDeleted ? (
            <div className="flex items-center gap-1 text-xs font-bold text-red-500 dark:text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 animate-fade-in">
              <Check className="h-3.5 w-3.5 stroke-3" />
              <span>Canceled</span>
            </div>
          ) : (
            <button
              type="button"
              disabled={isPending}
              onClick={handleDelete}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white shadow-sm hover:shadow-red-500/20 transition-all duration-200 active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>Cancel Schedule</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
