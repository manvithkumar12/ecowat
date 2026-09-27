import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Switch } from "@/shadcn/ui/switch";
import { Appliance, useUpdateAppliance } from "@ecowat/shared";
import { useUser } from "@/src/context/userContext";
import { useTranslations } from "next-intl";

interface EditApplianceDialogProps {
  appliance: Appliance | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditApplianceDialog({
  appliance,
  open,
  onOpenChange,
}: EditApplianceDialogProps) {
  const user = useUser();
  const t = useTranslations("Appliances.editDialog");

  const updateMutuation = useUpdateAppliance();
  const [power, setPower] = useState<number | undefined>(undefined);
  const [hours, setHours] = useState<number | undefined>(undefined);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (appliance && open) {
      setPower(appliance.powerRatingW);
      setHours(appliance.dailyUsageHours);
      setIsActive(appliance.status === true);
    }
  }, [appliance, open]);

  if (!user?.id) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      power === undefined ||
      hours === undefined ||
      !appliance ||
      !appliance.id
    )
      return;
    updateMutuation.mutate({
      id: appliance.id,
      status: isActive ? true : false,
      dailyUsageHours: hours,
      powerRatingW: power,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25 bg-white dark:bg-[#0a0a0a] border-slate-200 dark:border-stone-800">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-stone-100">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-stone-400">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label
              htmlFor="edit-name"
              className="text-slate-700 dark:text-stone-300"
            >
              {t("applianceName")}
            </Label>
            <div className="flex h-9 w-full rounded-md border border-slate-200 dark:border-stone-800 bg-slate-50 dark:bg-stone-900/50 px-3 text-sm items-center text-slate-500 dark:text-stone-400 cursor-not-allowed opacity-80">
              {appliance?.name || ""}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="edit-power"
                className="text-slate-700 dark:text-stone-300"
              >
                {t("power")}
              </Label>
              <Input
                id="edit-power"
                type="number"
                autoFocus
                value={Number.isNaN(power) ? "" : (power ?? "")}
                onChange={(e) => {
                  const value = e.target.value;
                  setPower(value === "" ? undefined : Number.parseFloat(value));
                }}
                className="border-slate-200 dark:border-stone-800 bg-slate-50 dark:bg-stone-900/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="edit-hours"
                className="text-slate-700 dark:text-stone-300"
              >
                {t("dailyUsage")}
              </Label>
              <Input
                id="edit-hours"
                type="number"
                step="0.1"
                value={Number.isNaN(hours) ? "" : (hours ?? "")}
                onChange={(e) => {
                  const value = e.target.value;

                  setHours(value === "" ? undefined : Number.parseFloat(value));
                }}
                className="border-slate-200 dark:border-stone-800 bg-slate-50 dark:bg-stone-900/50"
                min="0.1"
                max="24"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label
              htmlFor="edit-status"
              className="text-slate-700 dark:text-stone-300 cursor-pointer"
            >
              {t("activeAppliance")}
            </Label>
            <Switch
              id="edit-status"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="hover:bg-slate-100 dark:hover:bg-stone-900"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {t("submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
