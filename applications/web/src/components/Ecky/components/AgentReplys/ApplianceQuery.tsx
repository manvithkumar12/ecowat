import { useState, useEffect } from "react";
import { Zap, Clock, Check, Loader2, Trash2, Settings } from "lucide-react";
import { toast } from "sonner";
import {
  getApplianceName,
  getApplianceTypeAppName,
  getArrayApplianceName,
} from "@/src/utils/appliances/applianceName";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import { renderFormattedText } from "@/src/utils/ecky/render";
import { cancelProps } from "./ApplianceScheduling";
import {
  useAddAppliance,
  useApplianceDelete,
  useUpdateAppliance,
} from "@ecowat/shared";
import { useUserAppliancesContext } from "@/src/context/userAppliances";
import {
  getApplianceId,
  handleAddSingle,
  handleUpdatePower,
  handleUpdateUsageHours,
  isAlreadySaved,
} from "./utils/ApplianceAdding";
import {
  ApplianceAddQueryProps,
  ApplianceItemState,
} from "./utils/ApplianceAdd.types";

export const ApplianceAddQuery = ({
  message,
  isThinking,
  data,
}: ApplianceAddQueryProps) => {
  const addMutation = useAddAppliance();
  const { data: savedAppliances } = useUserAppliancesContext();
  const [appliances, setAppliances] = useState<ApplianceItemState[]>([]);

  useEffect(() => {
    if (!data?.parameters) {
      setAppliances([]);
      return;
    }

    const params: any = data.parameters;
    const items: ApplianceItemState[] = [];

    if (Array.isArray(params)) {
      params.forEach((p, idx) => {
        const rawName = String(p?.name || `Appliance ${idx + 1}`);
        const displayName = getApplianceName(rawName) || rawName;
        const category = getApplianceTypeAppName(rawName) || "General";
        const saved = isAlreadySaved(rawName, savedAppliances);
        items.push({
          id: `${rawName}-${idx}`,
          rawName,
          displayName,
          category,
          power: Number(p?.power) || 1500,
          powerUnit: String(p?.powerUnit || "W"),
          usageHours: Number(p?.usageHours) || 2.0,
          isAdded: saved,
          isPending: false,
        });
      });
    } else if (typeof params === "object") {
      const names = Array.isArray(params.name)
        ? params.name
        : params.name
          ? [params.name]
          : [];

      const powers = Array.isArray(params.power)
        ? params.power
        : params.power !== undefined
          ? [params.power]
          : [];

      const hours = Array.isArray(params.usageHours)
        ? params.usageHours
        : params.usageHours !== undefined
          ? [params.usageHours]
          : [];

      const units = Array.isArray(params.powerUnit)
        ? params.powerUnit
        : params.powerUnit !== undefined
          ? [params.powerUnit]
          : [];

      if (names.length > 0) {
        names.forEach((rawNameItem: any, idx: number) => {
          const rawName = String(rawNameItem);
          const displayName = getApplianceName(rawName) || rawName;
          const category = getApplianceTypeAppName(rawName) || "General";
          const powerVal =
            powers[idx] !== undefined
              ? Number(powers[idx])
              : powers[0] !== undefined
                ? Number(powers[0])
                : 1500;
          const hoursVal =
            hours[idx] !== undefined
              ? Number(hours[idx])
              : hours[0] !== undefined
                ? Number(hours[0])
                : 2.0;
          const unitVal = String(units[idx] || units[0] || "W");
          const saved = isAlreadySaved(rawName, savedAppliances);

          items.push({
            id: `${rawName}-${idx}`,
            rawName,
            displayName,
            category,
            power: isNaN(powerVal) ? 1500 : powerVal,
            powerUnit: unitVal,
            usageHours: isNaN(hoursVal) ? 2.0 : hoursVal,
            isAdded: saved,
            isPending: false,
          });
        });
      } else if (params.name) {
        const rawName = String(params.name);
        const displayName = getApplianceName(rawName) || rawName;
        const category = getApplianceTypeAppName(rawName) || "General";
        const saved = isAlreadySaved(rawName, savedAppliances);
        items.push({
          id: `${rawName}-0`,
          rawName,
          displayName,
          category,
          power: Number(params.power) || 1500,
          powerUnit: String(params.powerUnit || "W"),
          usageHours: Number(params.usageHours) || 2.0,
          isAdded: saved,
          isPending: false,
        });
      }
    }

    setAppliances(items);
  }, [data, savedAppliances]);

  const handleAddAll = () => {
    const toAdd = appliances.filter((a) => !a.isAdded && !a.isPending);
    if (toAdd.length === 0) return;

    toAdd.forEach((item) => {
      handleAddSingle(
        item.id,
        appliances,
        setAppliances,
        savedAppliances,
        addMutation,
        toast,
      );
    });
  };

  if (!data?.parameters || appliances.length === 0) {
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {message && renderFormattedText(message)}
        {isThinking && (
          <span className="inline-block h-3.5 w-1.5 ml-1 bg-emerald-500 dark:bg-emerald-400 animate-pulse rounded-full" />
        )}
      </div>
    );
  }

  const allAdded = appliances.every((a) => a.isAdded);

  return (
    <div className="flex flex-col gap-3 w-full">
      {message && (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {renderFormattedText(message)}
          {isThinking && (
            <span className="inline-block h-3.5 w-1.5 ml-1 bg-emerald-500 dark:bg-emerald-400 animate-pulse rounded-full" />
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 mt-1 w-full max-w-lg">
        {appliances.map((app) => (
          <div
            key={app.id}
            className={`border bg-slate-50/40 dark:bg-[#111] rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none animate-fade-in text-slate-800 dark:text-slate-100 transition-all ${
              app.isAdded
                ? "border-emerald-500/40 dark:border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/5"
                : "border-slate-200 dark:border-emerald-500/20"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3.5 mb-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
                  {getApplianceIcon(app.category || "default")}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">
                    {app.displayName}
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-emerald-400/80 bg-slate-100/80 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {app.category || "Appliance"}
                  </span>
                </div>
              </div>

              {app.isAdded ? (
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 animate-fade-in shrink-0">
                  <Check className="h-3.5 w-3.5 stroke-3" />
                  <span>Added</span>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={app.isPending}
                  onClick={() =>
                    handleAddSingle(
                      app.id,
                      appliances,
                      setAppliances,
                      savedAppliances,
                      addMutation,
                      toast,
                    )
                  }
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-sm hover:shadow-emerald-500/20 transition-all duration-200 active:scale-98 disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {app.isPending && (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  )}
                  <span>Add Appliance</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-slate-150 dark:border-[#222] pt-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold flex items-center gap-1">
                  <Zap className="h-3 w-3 text-amber-500" />
                  Power Rating ({app.powerUnit})
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    disabled={app.isAdded || app.isPending}
                    value={app.power}
                    onChange={(e) =>
                      handleUpdatePower(
                        app.id,
                        Number(e.target.value),
                        setAppliances || 0,
                      )
                    }
                    className="w-full text-xs font-bold font-mono px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2a2a2a] focus:border-emerald-500 focus:outline-none text-slate-800 dark:text-slate-100 disabled:opacity-60"
                  />
                  <span className="text-[11px] font-bold text-slate-400 shrink-0">
                    {app.powerUnit}
                  </span>
                </div>
              </div>

              {/* Usage Hours Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold flex items-center gap-1">
                  <Clock className="h-3 w-3 text-sky-500" />
                  Daily Usage (Hours)
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="0.5"
                    min="0.1"
                    max="24"
                    disabled={app.isAdded || app.isPending}
                    value={app.usageHours}
                    onChange={(e) =>
                      handleUpdateUsageHours(
                        app.id,
                        Number(e.target.value) || 0,
                        setAppliances,
                      )
                    }
                    className="w-full text-xs font-bold font-mono px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2a2a2a] focus:border-emerald-500 focus:outline-none text-slate-800 dark:text-slate-100 disabled:opacity-60"
                  />
                  <span className="text-[11px] font-bold text-slate-400 shrink-0">
                    hrs
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {appliances.length > 1 && !allAdded && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={handleAddAll}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-sm transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <Check className="h-4 w-4" />
              <span>
                Add All ({appliances.filter((a) => !a.isAdded).length})
                Appliances
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const DeleteAppliance = ({
  parameters,
  isThinking,
  text,
}: cancelProps) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { data: savedAppliances } = useUserAppliancesContext();
  const deleteMutation = useApplianceDelete();
  const deletingIds: number[] = [];
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
  const applianceNames: string[] = Array.isArray(parameters.name)
    ? parameters.name
    : parameters.name
      ? [parameters.name]
      : [];

  if (applianceNames.length > 0) {
    applianceNames.forEach((app) => {
      if (isAlreadySaved(app, savedAppliances)) {
        const id = getApplianceId(app, savedAppliances);
        if (id) deletingIds.push(Number(id));
      }
    });
  }

  const handleDelete = () => {
    const matchedIds: number[] = [];
    applianceNames.forEach((app) => {
      const id = getApplianceId(app, savedAppliances);
      if (id) matchedIds.push(Number(id));
    });

    const idsToDelete = matchedIds.length > 0 ? matchedIds : deletingIds;

    if (idsToDelete.length === 0) {
      toast.error("No matching saved appliance found to delete");
      return;
    }

    setIsPending(true);
    Promise.all(idsToDelete.map((id) => deleteMutation.mutateAsync(id)))
      .then(() => {
        setIsPending(false);
        setIsDeleted(true);
        toast.success(
          `${getArrayApplianceName(parameters.name)} deleted from saved appliances!`,
        );
      })
      .catch((err) => {
        setIsPending(false);
        toast.error(err?.message || "Failed to delete appliance");
      });
  };

  const savedApplianceNames = applianceNames.filter((app) =>
    isAlreadySaved(app, savedAppliances),
  );

  const firstAppliance = savedApplianceNames[0] || applianceNames[0] || "";
  const category = getApplianceTypeAppName(
    getApplianceName(firstAppliance) || firstAppliance,
  );

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

      {savedApplianceNames.length > 0 && (
        <div className="mt-2 w-full max-w-sm sm:max-w-md border border-red-500/20 bg-red-50/10 dark:bg-red-950/5 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-none animate-fade-in text-slate-800 dark:text-slate-100">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400 flex items-center justify-center border border-red-500/20 shrink-0">
              {getApplianceIcon(category || "default")}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">
                {getArrayApplianceName(savedApplianceNames)}
              </h4>
              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {category || "Appliance"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-slate-100 dark:border-[#222] pt-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
              <Trash2 className="h-4 w-4 text-red-500 shrink-0" />
              <span>Saved Appliance</span>
            </div>

            {isDeleted ? (
              <div className="flex items-center gap-1 text-xs font-bold text-red-500 dark:text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 animate-fade-in">
                <Check className="h-3.5 w-3.5 stroke-3" />
                <span>Deleted</span>
              </div>
            ) : (
              <button
                type="button"
                disabled={isPending}
                onClick={handleDelete}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white shadow-sm hover:shadow-red-500/20 transition-all duration-200 active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Delete saved</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const UpdateAppliance = ({
  parameters,
  isThinking,
  text,
}: cancelProps) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { data: savedAppliances } = useUserAppliancesContext();
  const updateMutation = useUpdateAppliance();

  const params = parameters as any;
  const rawName = Array.isArray(params?.name) ? params.name[0] : params?.name;
  const cleanName = String(rawName || "")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "");

  const existingApp = savedAppliances?.find(
    (s: any) => s.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "") === cleanName,
  );
  const isSaved = Boolean(existingApp);

  const [editPower, setEditPower] = useState<number>(
    Number(params?.power) || existingApp?.powerRatingW || 1500,
  );
  const [editHours, setEditHours] = useState<number>(
    Number(params?.usageHours) || existingApp?.dailyUsageHours || 2.0,
  );
  const [editStatus, setEditStatus] = useState<boolean>(
    params?.status !== undefined
      ? Boolean(params.status)
      : existingApp?.status !== undefined
        ? Boolean(existingApp.status)
        : true,
  );

  useEffect(() => {
    if (existingApp) {
      if (params?.power !== undefined) {
        setEditPower(Number(params.power) || 1500);
      } else if (existingApp.powerRatingW || existingApp.powerRatingW) {
        setEditPower(
          Number(existingApp.powerRatingW || existingApp.powerRatingW),
        );
      }
      if (params?.usageHours !== undefined) {
        setEditHours(Number(params.usageHours) || 2.0);
      } else if (existingApp.dailyUsageHours) {
        setEditHours(Number(existingApp.dailyUsageHours));
      }

      if (params?.status !== undefined) {
        setEditStatus(Boolean(params.status));
      } else if (existingApp.status !== undefined) {
        setEditStatus(Boolean(existingApp.status));
      }
    }
  }, [existingApp, params]);

  if (!params) {
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {text && renderFormattedText(text)}
        {isThinking && (
          <span className="inline-block h-3.5 w-1.5 ml-1 bg-emerald-500 dark:bg-emerald-400 animate-pulse rounded-full" />
        )}
      </div>
    );
  }

  const handleUpdate = () => {
    const targetId = existingApp?.id || params?.id;
    if (!targetId) {
      toast.error("Appliance ID not found to update");
      return;
    }

    setIsPending(true);
    updateMutation.mutate(
      {
        id: Number(targetId),
        powerRatingW: editPower,
        dailyUsageHours: editHours,
        status: editStatus,
      },
      {
        onSuccess: () => {
          setIsPending(false);
          setIsUpdated(true);
          toast.success(
            `${getApplianceName(rawName) || rawName} updated successfully!`,
            {
              description: `Power: ${editPower}W, Usage: ${editHours}h/day, Status: ${editStatus ? "Active" : "Inactive"}`,
            },
          );
        },
        onError: (err: any) => {
          setIsPending(false);
          toast.error(err?.message || "Failed to update appliance");
        },
      },
    );
  };

  const displayName = getApplianceName(rawName) || rawName;
  const category = getApplianceTypeAppName(displayName || rawName);

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

      {isSaved && (
        <div className="mt-2 w-full max-w-sm sm:max-w-md border border-sky-500/20 bg-sky-50/10 dark:bg-sky-950/5 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-none animate-fade-in text-slate-800 dark:text-slate-100">
          <div className="flex items-center gap-3.5 mb-3.5">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 dark:bg-sky-500/20 dark:text-sky-400 flex items-center justify-center border border-sky-500/20 shrink-0">
              {getApplianceIcon(category || "default")}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">
                {displayName}
              </h4>
              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {category || "Appliance"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-100/70 dark:bg-[#181818] border border-slate-200 dark:border-[#2a2a2a] mb-3.5">
            <div className="flex items-center gap-2">
              <Zap
                className={`h-3.5 w-3.5 transition-colors ${
                  editStatus ? "text-emerald-500" : "text-slate-400"
                }`}
              />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Status:
                <span
                  className={`text-[11px] font-extrabold ${
                    editStatus
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {editStatus ? "Active (On)" : "Inactive (Off)"}
                </span>
              </span>
            </div>
            <button
              type="button"
              disabled={isUpdated || isPending}
              onClick={() => setEditStatus((prev) => !prev)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${
                editStatus ? "bg-emerald-500" : "bg-gray-400 dark:bg-slate-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 mt-1 ml-1 w-4 transform rounded-full shadow ring-0 transition duration-200 ease-in-out ${
                  editStatus
                    ? "translate-x-4 bg-white"
                    : "translate-x-0 bg-gray-200"
                }`}
              />
            </button>
          </div>

          {/* Editable Specs Grid */}
          <div className="grid grid-cols-2 gap-3 border-t border-b border-slate-100 dark:border-[#222] py-4 mb-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold flex items-center gap-1">
                <Zap className="h-3 w-3 text-amber-500" />
                Power Rating (W)
              </label>
              <input
                type="number"
                disabled={isUpdated || isPending}
                value={editPower}
                onChange={(e) => setEditPower(Number(e.target.value) || 0)}
                className="w-full text-xs font-bold font-mono px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2a2a2a] focus:border-sky-500 focus:outline-none text-slate-800 dark:text-slate-100 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold flex items-center gap-1">
                <Clock className="h-3 w-3 text-sky-500" />
                Daily Usage (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="0.1"
                max="24"
                disabled={isUpdated || isPending}
                value={editHours}
                onChange={(e) =>
                  setEditHours(
                    Math.min(
                      24,
                      Math.max(0.1, Number(Number(e.target.value).toFixed(1))),
                    ),
                  )
                }
                className="w-full text-xs font-bold font-mono px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2a2a2a] focus:border-sky-500 focus:outline-none text-slate-800 dark:text-slate-100 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400">
              <Settings className="h-4 w-4 text-sky-500 shrink-0" />
              <span>Update Details</span>
            </div>

            {isUpdated ? (
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 animate-fade-in">
                <Check className="h-3.5 w-3.5 stroke-3" />
                <span>Updated</span>
              </div>
            ) : (
              <button
                type="button"
                disabled={isPending}
                onClick={handleUpdate}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 text-white shadow-sm hover:shadow-sky-500/20 transition-all duration-200 active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Save Changes</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
