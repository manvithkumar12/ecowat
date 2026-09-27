import { Button } from "@/shadcn/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/ui/dialog";
import { Input } from "@/shadcn/ui/input";
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
import { Edit2, Loader2 } from "lucide-react";
import { UseMutationResult } from "@tanstack/react-query";
import React from "react";
import { useTranslations } from "next-intl";

interface EditSectionProps {
  editingAppliance: any;
  setEditingAppliance: (appliance: any) => void;
  editRating: string;
  setEditRating: (rating: string) => void;
  editStartTime: string;
  setEditStartTime: (time: string) => void;
  editEndTime: string;
  setEditEndTime: (time: string) => void;
  editDuration: number;
  editKwh: number;
  editTotalPrice: number;
  handleEditSubmit: (e: React.FormEvent) => void;
  updateMutation: UseMutationResult<any, any, any, any>;
}

const EditSection = ({
  editingAppliance,
  setEditingAppliance,
  editRating,
  setEditRating,
  editStartTime,
  setEditStartTime,
  editEndTime,
  setEditEndTime,
  editDuration,
  editKwh,
  editTotalPrice,
  handleEditSubmit,
  updateMutation,
}: EditSectionProps) => {
  const t = useTranslations("Tracker.editModal");

  return (
    <DialogContent className="sm:max-w-md bg-white dark:bg-[#111111] border-slate-200 dark:border-[#1e1e1e] rounded-2xl shadow-xl">
      <DialogHeader>
        <DialogTitle className="text-slate-900 dark:text-stone-100 flex items-center gap-2">
          <Edit2 className="h-4.5 w-4.5 text-emerald-500" />
          {t("title")}
        </DialogTitle>
        <DialogDescription className="text-slate-500 dark:text-stone-400">
          {t("description")}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">
        {/* Appliance Name (Readonly) */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-700 dark:text-stone-300">
            {t("applianceName")}
          </Label>
          <Input
            value={
              editingAppliance
                ? Availableappliances.find(
                    (a) => a.dbName === editingAppliance.appliance.name,
                  )?.name || editingAppliance.appliance.name
                : ""
            }
            disabled
            className="border-slate-200 dark:border-[#1e1e1e] bg-slate-100 dark:bg-stone-900 cursor-not-allowed opacity-75 rounded-xl h-10 font-bold capitalize text-slate-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Power Rating Input */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-power"
              className="text-xs font-bold text-slate-700 dark:text-stone-300"
            >
              {t("rating")}
            </Label>
            <Input
              id="edit-power"
              type="number"
              value={editRating}
              onChange={(e) => setEditRating(e.target.value)}
              className="border-slate-200 dark:border-[#1e1e1e] bg-slate-55 dark:bg-stone-900/50 rounded-xl h-10"
              min="1"
              required
            />
          </div>
          <div className="flex items-end justify-end pb-1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Start Time Select */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-start"
              className="text-xs font-bold text-slate-700 dark:text-stone-300"
            >
              {t("operatingPeriod")}
            </Label>
            <Select
              value={editStartTime}
              onValueChange={(val) => {
                setEditStartTime(val);
                const startVal = parseTimeToFraction(val);
                const endVal = parseTimeToFraction(editEndTime);
                if (endVal <= startVal) {
                  const validOptions = TIME_OPTIONS.filter(
                    (tOpt) => parseTimeToFraction(tOpt) > startVal,
                  );
                  const oneHourLaterVal = startVal + 1;
                  const oneHourOption = validOptions.find(
                    (tOpt) => parseTimeToFraction(tOpt) === oneHourLaterVal,
                  );
                  if (oneHourOption) {
                    setEditEndTime(oneHourOption);
                  } else if (validOptions.length > 0) {
                    setEditEndTime(validOptions[0]);
                  }
                }
              }}
              required
            >
              <SelectTrigger
                id="edit-start"
                className="border-slate-200 dark:border-[#1e1e1e] bg-slate-55 dark:bg-stone-900/50 rounded-xl h-10 font-medium cursor-pointer"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#111111] border-slate-200 dark:border-[#1e1e1e] max-h-56">
                {TIME_OPTIONS.slice(0, -1).map((tOpt) => (
                  <SelectItem key={tOpt} value={tOpt} className="cursor-pointer">
                    {tOpt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* End Time Select */}
          <div className="space-y-2">
            <Label
              htmlFor="edit-end"
              className="text-xs font-bold text-slate-700 dark:text-stone-300"
            >
              {t("to")}
            </Label>
            <Select value={editEndTime} onValueChange={setEditEndTime} required>
              <SelectTrigger
                id="edit-end"
                className="border-slate-200 dark:border-[#1e1e1e] bg-slate-55 dark:bg-stone-900/50 rounded-xl h-10 font-medium cursor-pointer"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#111111] border-slate-200 dark:border-[#1e1e1e] max-h-56">
                {TIME_OPTIONS.filter(
                  (tOpt) =>
                    parseTimeToFraction(tOpt) > parseTimeToFraction(editStartTime),
                ).map((tOpt) => (
                  <SelectItem key={tOpt} value={tOpt} className="cursor-pointer">
                    {tOpt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Calculated Duration (Readonly) */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-755 dark:text-stone-350">
            {t("duration")}
          </Label>
          <Input
            value={`${editDuration.toFixed(1)} h`}
            disabled
            className="border-slate-200 dark:border-[#1e1e1e] bg-slate-100 dark:bg-stone-900 cursor-not-allowed opacity-75 font-mono rounded-xl h-10 text-slate-500"
          />
        </div>

        {/* Calculated kWh (Readonly) */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-755 dark:text-stone-350">
            {t("estConsumption")}
          </Label>
          <Input
            value={`${editKwh.toFixed(3)} kWh`}
            disabled
            className="border-slate-200 dark:border-[#1e1e1e] bg-slate-100 dark:bg-stone-900 cursor-not-allowed opacity-75 font-mono rounded-xl h-10 text-slate-500"
          />
        </div>

        {/* Price Rate (Readonly) */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-slate-755 dark:text-stone-350">
            {t("estCost")}
          </Label>
          <Input
            value={`€${editTotalPrice.toFixed(2)}`}
            disabled
            className="border-slate-200 dark:border-[#1e1e1e] bg-slate-100 dark:bg-stone-900 cursor-not-allowed opacity-75 font-mono rounded-xl h-10 text-emerald-600 font-bold dark:text-emerald-500"
          />
        </div>

        <DialogFooter className="pt-4 gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setEditingAppliance(null)}
            className="hover:bg-slate-100 dark:hover:bg-stone-900 rounded-xl font-bold cursor-pointer"
          >
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            disabled={updateMutation.isPending}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t("updating")}
              </>
            ) : (
              t("saveChanges")
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditSection;
