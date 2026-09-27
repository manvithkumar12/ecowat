import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/ui/dialog";
import { Loader2, Plus, Clock, Cpu, Zap } from "lucide-react";
import { Label } from "@/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import {
  Availableappliances,
  parseTimeToFraction,
  TIME_OPTIONS,
} from "@ecowat/shared";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { UseMutationResult } from "@tanstack/react-query";
import React from "react";
import { useTranslations } from "next-intl";

export interface AddUsedApplianceProps {
  addMutation: UseMutationResult<any, any, any, any>;
  addName: string;
  setAddName: (value: string) => void;
  addRating: string;
  setAddRating: (value: string) => void;
  addStartTime: string;
  setAddStartTime: (value: string) => void;
  addEndTime: string;
  setAddEndTime: (value: string) => void;
  addDuration: number;
  addKwh: number;
  addTotalPrice: number;
  setIsAddOpen: (value: boolean) => void;
  handleAddSubmit: (e: React.FormEvent) => void;
}

const AddUsedAppliance = ({
  addMutation,
  addName,
  setAddName,
  addRating,
  setAddRating,
  addStartTime,
  setAddStartTime,
  addEndTime,
  setAddEndTime,
  addDuration,
  addKwh,
  addTotalPrice,
  setIsAddOpen,
  handleAddSubmit,
}: AddUsedApplianceProps) => {
  const t = useTranslations("Tracker.addModal");
  return (
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

      <form onSubmit={handleAddSubmit} className="space-y-5 pt-2">
        {/* Appliance Name */}
        <div className="space-y-1.5">
          <Label
            htmlFor="appliance-name"
            className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider"
          >
            {t("applianceName")}
          </Label>
          <Select value={addName} onValueChange={setAddName} required>
            <SelectTrigger
              id="appliance-name"
              className="border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 rounded-xl h-10 font-medium text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
            >
              <SelectValue placeholder={t("selectPlaceholder")} />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-xl">
              {Availableappliances.map((app) => (
                <SelectItem key={app.id} value={app.dbName} className="text-xs font-medium cursor-pointer">
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
            {t("rating")}
          </Label>
          <Input
            id="appliance-power"
            type="number"
            placeholder={t("ratingPlaceholder")}
            value={addRating}
            onChange={(e) => setAddRating(e.target.value)}
            className="border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 rounded-xl h-10 font-medium text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            min="1"
            required
          />
        </div>

        {/* Operating Period (Start & End Time) */}
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider">
            {t("operatingPeriod")}
          </Label>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Select
                value={addStartTime}
                onValueChange={(val) => {
                  setAddStartTime(val);
                  const startVal = parseTimeToFraction(val);
                  const endVal = parseTimeToFraction(addEndTime);
                  if (endVal <= startVal) {
                    const validOptions = TIME_OPTIONS.filter(
                      (tTime) => parseTimeToFraction(tTime) > startVal,
                    );
                    const oneHourLaterVal = startVal + 1;
                    const oneHourOption = validOptions.find(
                      (tTime) => parseTimeToFraction(tTime) === oneHourLaterVal,
                    );
                    if (oneHourOption) {
                      setAddEndTime(oneHourOption);
                    } else if (validOptions.length > 0) {
                      setAddEndTime(validOptions[0]);
                    }
                  }
                }}
                required
              >
                <SelectTrigger
                  id="appliance-start"
                  className="w-full border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 rounded-xl h-10 font-medium text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                >
                  <SelectValue placeholder={t("startPlaceholder")} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 max-h-48 rounded-xl">
                  {TIME_OPTIONS.slice(0, -1).map((tTime) => (
                    <SelectItem key={tTime} value={tTime} className="text-xs font-medium cursor-pointer">
                      {tTime}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <span className="text-slate-450 dark:text-zinc-500 font-bold text-xs shrink-0 px-0.5">{t("to")}</span>
            <div className="flex-1">
              <Select value={addEndTime} onValueChange={setAddEndTime} required>
                <SelectTrigger
                  id="appliance-end"
                  className="w-full border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40 rounded-xl h-10 font-medium text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                >
                  <SelectValue placeholder={t("endPlaceholder")} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 max-h-48 rounded-xl">
                  {TIME_OPTIONS.filter(
                    (tTime) =>
                      parseTimeToFraction(tTime) > parseTimeToFraction(addStartTime),
                  ).map((tTime) => (
                    <SelectItem key={tTime} value={tTime} className="text-xs font-medium cursor-pointer">
                      {tTime}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Simple summary stats */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-100 dark:border-zinc-900/60">
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block mb-1.5">
              {t("duration")}
            </span>
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 font-mono">
              {addDuration.toFixed(1)} h
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block mb-1.5">
              {t("usage")}
            </span>
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 font-mono">
              {addKwh.toFixed(3)} kWh
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block mb-1.5">
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
            onClick={() => setIsAddOpen(false)}
            className="flex-1 sm:flex-initial hover:bg-slate-50 dark:hover:bg-stone-900 rounded-xl font-bold text-xs cursor-pointer"
          >
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            disabled={addMutation.isPending}
            className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs flex items-center justify-center cursor-pointer"
          >
            {addMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t("logging")}
              </>
            ) : (
              t("addBtn")
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AddUsedAppliance;
