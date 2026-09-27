import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "@/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { parseTimeToFraction, useAddSchedule } from "@ecowat/shared";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { toast } from "sonner";
import { useUserAppliancesContext } from "@/src/context/userAppliances";
import { handleApplianceChange } from "@/src/utils/appliances/schedule";
import { useLivePrice } from "@/src/context/usePriceData";
import { calculateDetailedUsage } from "@ecowat/shared";
import { useTranslations } from "next-intl";

export interface AddAppliancePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getOneHourLaterCapped = (timeStr: string): string => {
  if (!timeStr) return "12:00";
  const [h, m] = timeStr.split(":").map(Number);
  if (h >= 23) return "23:59";
  const newH = h + 1;
  return `${String(newH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const formatTimeInput = (value: string): string => {
  const clean = value.replace(/\D/g, "");
  if (clean.length <= 2) {
    return clean;
  }
  return `${clean.slice(0, 2)}:${clean.slice(2, 4)}`;
};

const isValid24hTime = (timeStr: string): boolean => {
  return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr);
};

const formatDuration = (hoursDecimal: number): string => {
  const h = Math.floor(hoursDecimal);
  const m = Math.round((hoursDecimal - h) * 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

const AddAppliancePopup = ({ open, onOpenChange }: AddAppliancePopupProps) => {
  const t = useTranslations("Schedule.addDialog");
  const [addName, setAddName] = useState("");
  const [addRating, setAddRating] = useState("");
  const [addStartTime, setAddStartTime] = useState("12:00");
  const [addEndTime, setAddEndTime] = useState("13:00");
  const HourlyPrices = useLivePrice().PriceData?.hourlyPrices;
  const addMutuation = useAddSchedule();
  const Availableappliances = useUserAppliancesContext().data;

  const currentGermanTime = useMemo(() => {
    if (!open) return "00:00";
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  }, [open]);

  useEffect(() => {
    if (open) {
      setAddStartTime(currentGermanTime);
      setAddEndTime(getOneHourLaterCapped(currentGermanTime));
    }
  }, [open, currentGermanTime]);

  const { addDuration, addKwh, addTotalPrice } = useMemo(() => {
    const rating = Number(addRating) || 0;
    const { duration, kwh, totalPrice } = calculateDetailedUsage(
      rating,
      addStartTime,
      addEndTime,
      HourlyPrices || [],
    );
    return { addDuration: duration, addKwh: kwh, addTotalPrice: totalPrice };
  }, [addRating, addStartTime, addEndTime, HourlyPrices]);

  const handleStartTimeChange = (val: string) => {
    setAddStartTime(val);
    if (isValid24hTime(val)) {
      const startFraction = parseTimeToFraction(val);
      const endFraction = parseTimeToFraction(addEndTime);
      if (endFraction <= startFraction) {
        setAddEndTime(getOneHourLaterCapped(val));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAppliance = Availableappliances?.find(
      (a) => a.name === addName,
    );
    const ApplianceId = selectedAppliance?.id;

    if (
      !addName ||
      !addRating ||
      !addStartTime ||
      !addEndTime ||
      !ApplianceId ||
      !selectedAppliance
    ) {
      toast.error(t("validationFillAll"));
      return;
    }

    if (!isValid24hTime(addStartTime) || !isValid24hTime(addEndTime)) {
      toast.error(t("validationInvalidTime"));
      return;
    }

    const startFraction = parseTimeToFraction(addStartTime);
    const endFraction = parseTimeToFraction(addEndTime);
    const minFraction = parseTimeToFraction(currentGermanTime);

    // Enforce future time validation
    if (startFraction < minFraction - 0.01) {
      toast.error(t("validationFutureTime", { time: currentGermanTime }));
      return;
    }

    if (endFraction <= startFraction) {
      toast.error(t("validationEndTimeAfterStart"));
      return;
    }

    addMutuation.mutate({
      applianceId: ApplianceId,
      startHour: addStartTime,
      endHourHour: addEndTime,
      powerConsumed: addKwh,
      name: selectedAppliance.DBName,
      rating: Math.round(Number.parseFloat(addRating)) || 5,
    });

    toast.success(t("toastAdded", { name: addName }));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl p-6 animate-in fade-in duration-200">
        <DialogHeader className="pb-3 border-b border-slate-100 dark:border-zinc-900/60">
          <DialogTitle className="text-base font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
            <Plus className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-zinc-400">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="appliance-name"
              className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider"
            >
              {t("applianceName")}
            </Label>
            <span className="text-xs opacity-60">
              ({" "}
              <span className="underline underline-offset-2">
                {" "}
                {t("savedAppliances")}
              </span>
              )
            </span>
            <Select
              value={addName}
              onValueChange={(val) =>
                handleApplianceChange(
                  val,
                  setAddName,
                  setAddRating,
                  Availableappliances,
                )
              }
              required
            >
              <SelectTrigger
                id="appliance-name"
                className="border-slate-200 mt-2 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 rounded-xl h-10 font-medium text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
              >
                <SelectValue placeholder={t("selectPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-xl">
                {Availableappliances?.map((app) => (
                  <SelectItem
                    key={app.id}
                    value={app.name}
                    className="text-xs font-medium cursor-pointer"
                  >
                    {app.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rating */}
          <div className="space-y-1.5">
            <Label
              htmlFor="appliance-power"
              className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider"
            >
              {t("power")}
            </Label>
            <Input
              id="appliance-power"
              type="number"
              placeholder={t("powerPlaceholder")}
              value={addRating}
              onChange={(e) => setAddRating(e.target.value)}
              className="border-slate-200 mt-2 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 rounded-xl h-10 font-medium text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              min="1"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider font-sans">
              {t("operatingPeriod")}
            </Label>
            <div className="flex mt-2 items-center gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  id="appliance-start"
                  placeholder="HH:MM"
                  value={addStartTime}
                  onChange={(e) =>
                    handleStartTimeChange(formatTimeInput(e.target.value))
                  }
                  maxLength={5}
                  required
                  className="w-full text-center border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 rounded-xl h-10 font-mono font-bold text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                />
              </div>
              <span className="text-slate-450 dark:text-zinc-500 font-bold text-xs shrink-0 px-0.5">
                {t("to")}
              </span>
              <div className="flex-1">
                <Input
                  type="text"
                  id="appliance-end"
                  placeholder="HH:MM"
                  value={addEndTime}
                  onChange={(e) =>
                    setAddEndTime(formatTimeInput(e.target.value))
                  }
                  maxLength={5}
                  required
                  className="w-full text-center border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 rounded-xl h-10 font-mono font-bold text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-100 dark:border-zinc-900/60">
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block mb-1.5 font-sans">
                {t("duration")}
              </span>
              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 font-mono">
                {formatDuration(addDuration)}
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block mb-1.5 font-sans">
                {t("usage")}
              </span>
              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 font-mono">
                {addKwh.toFixed(3)} kWh
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block mb-1.5 font-sans">
                {t("estCost")}
              </span>
              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 font-mono">
                €{addTotalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <DialogFooter className="pt-3 gap-2 flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="flex-1 sm:flex-initial hover:bg-slate-50 dark:hover:bg-stone-900 rounded-xl font-bold text-xs cursor-pointer"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs cursor-pointer"
            >
              {t("addToSchedule")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppliancePopup;
