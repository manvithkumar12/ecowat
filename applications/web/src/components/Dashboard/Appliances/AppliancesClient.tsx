"use client";

import { useState, useMemo } from "react";
import { Loader2, Save, Plus, Edit2, Trash2, Search } from "lucide-react";
import { useAddAppliance, useChangeStatus } from "@ecowat/shared";
import { toast } from "sonner";
import { Availableappliances } from "@ecowat/shared";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Switch } from "@/shadcn/ui/switch";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { Appliance } from "@ecowat/shared";
import { useUserAppliancesContext } from "@/src/context/userAppliances";
import { AddApplianceDialog } from "@/src/components/Dashboard/Appliances/AddApplianceDialog";
import { EditApplianceDialog } from "@/src/components/Dashboard/Appliances/EditApplianceDialog";
import { DeleteApplianceDialog } from "@/src/components/Dashboard/Appliances/DeleteApplianceDialog";
import { useUser } from "@/src/context/userContext";
import AppliancesLoading from "./states/AppliancesLoading";
import Empty from "./states/Empty";
import NavCards from "./states/NavCards";
import FilterBar, { FilterType } from "./states/FilterBar";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import ErrorPage from "../../generalComponents/ErroPage";
import { useTranslations } from "next-intl";

const HIGH_USAGE_THRESHOLD_KWH = 2;

export default function AppliancesClient() {
  const user = useUser();
  const tHeader = useTranslations("Appliances.header");
  const tCard = useTranslations("Appliances.card");

  const addMutation = useAddAppliance();
  const statusMutation = useChangeStatus();
  const {
    data: appliancesQuery,
    isLoading,
    isError,
  } = useUserAppliancesContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [applianceToEdit, setApplianceToEdit] = useState<Appliance | null>(
    null,
  );
  const [applianceToDelete, setApplianceToDelete] = useState<Appliance | null>(
    null,
  );

  if (!user?.id) {
    return <div>Please login</div>;
  }

  const handleStatusChange = (id: number, CurrentStatus: boolean) => {
    statusMutation.mutate(
      { id, CurrentStatus },
      {
        onError: () => {
          toast.error("UNABLE_TO_UPDATE");
        },
      },
    );
  };

  const handleAddAppliance = (newAppliance: Omit<Appliance, "id">) => {
    addMutation.mutate(newAppliance, {
      onError: (err: Error) => {
        toast.error(err.message || "SOMETHING_WENT_WRONG");
        return;
      },
    });
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(tHeader("saveSuccessTitle"), {
        description: tHeader("saveSuccessDesc"),
      });
    }, 800);
  };

  const activeAppliances = appliancesQuery?.filter(
    (app) => app.status === true,
  );
  const inactiveAppliances = appliancesQuery?.filter(
    (app) => app.status === false,
  );
  const highUsageAppliances = appliancesQuery?.filter(
    (app) =>
      (app.powerRatingW * app.dailyUsageHours) / 1000 >
      HIGH_USAGE_THRESHOLD_KWH,
  );
  const replaceableAppliances = appliancesQuery?.filter((item) =>
    Availableappliances.find(
      (app) => app.name === item.name && app.isReplacable,
    ),
  );

  const filterCounts = {
    all: appliancesQuery?.length ?? 0,
    active: activeAppliances?.length ?? 0,
    inactive: inactiveAppliances?.length ?? 0,
    highUsage: highUsageAppliances?.length ?? 0,
    Optimizable: replaceableAppliances?.length ?? 0,
  };

  const filteredAppliances = useMemo(() => {
    let list = appliancesQuery;
    switch (activeFilter) {
      case "active":
        list = activeAppliances;
        break;
      case "inactive":
        list = inactiveAppliances;
        break;
      case "highUsage":
        list = highUsageAppliances;
        break;
      case "Optimizable":
        list = replaceableAppliances;
        break;
    }
    if (searchQuery) {
      list = list?.filter((app) =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return list;
  }, [appliancesQuery, searchQuery, activeFilter]);

  if (isError) {
    return <ErrorPage type={"APPLIANCES"} />;
  }
  if (isLoading) {
    return <AppliancesLoading />;
  }
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-stone-100">
            {tHeader("title")}
          </h1>
          <p className="text-sm text-slate-500 dark:text-stone-400 mt-1">
            {tHeader("description")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-stone-400" />
            <Input
              type="text"
              placeholder={tHeader("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full sm:w-64 border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09]"
            />
          </div>
          <Button
            variant="outline"
            className="hidden sm:flex border-slate-200 dark:border-stone-800 hover:bg-slate-50 dark:hover:bg-stone-900"
            onClick={handleSaveChanges}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {tHeader("saveChanges")}
          </Button>
          <AddApplianceDialog onAdd={handleAddAppliance}>
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white transition-all shadow-sm">
              <Plus className="h-4 w-4 mr-2" />
              {tHeader("addAppliance")}
            </Button>
          </AddApplianceDialog>
        </div>
      </div>
      <NavCards
        appliancesQuery={appliancesQuery}
        activeAppliances={activeAppliances}
      />
      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        counts={filterCounts}
      />
      {filteredAppliances?.length === 0 ? (
        <Empty handleAddAppliance={handleAddAppliance} type={activeFilter} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredAppliances?.map((app) => (
            <Card
              key={app.id}
              className={`group transition-all duration-200 hover:shadow-md border bg-white dark:bg-[#0c0a09] overflow-hidden ${
                app.status === true
                  ? "border-slate-200 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-900/50"
                  : "border-slate-100 dark:border-stone-900 opacity-75"
              }`}
            >
              <CardHeader className="flex flex-row items-start justify-between p-5 pb-4 border-b border-slate-100 dark:border-stone-900/50">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      app.status === true
                        ? "bg-slate-100 dark:bg-stone-800 text-slate-700 dark:text-stone-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-500"
                        : "bg-slate-50 dark:bg-stone-900 text-slate-400 dark:text-stone-500"
                    }`}
                  >
                    {getApplianceIcon(app.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-stone-100 line-clamp-1">
                      {app.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-stone-400 mt-0.5">
                      {
                        Availableappliances.find((a) => a.dbName === app.name)
                          ?.name
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Switch
                    onClick={() => handleStatusChange(app.id, app.status)}
                    checked={app.status === true}
                    className="data-[state=checked]:bg-emerald-500 mr-2"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-stone-900/50">
                  <div className="p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-1">
                      {tCard("rating")}
                    </span>
                    <span className="text-sm font-bold text-slate-700 dark:text-stone-200 font-mono">
                      {app.powerRatingW} W
                    </span>
                  </div>
                  <div className="p-4 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-stone-900/20">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-1">
                      {tCard("usage")}
                    </span>
                    <span className="text-sm font-bold text-slate-700 dark:text-stone-200 font-mono">
                      {app.dailyUsageHours} h
                    </span>
                  </div>
                  <div className="p-4 flex flex-col items-center justify-center text-center bg-emerald-50/30 dark:bg-emerald-900/5">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-1">
                      {tCard("daily")}
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-500 font-mono">
                      {(
                        (app.powerRatingW * app.dailyUsageHours) /
                        1000
                      ).toFixed(2)}{" "}
                      kWh
                    </span>
                  </div>
                </div>
                <div className="flex items-center divide-x divide-slate-100 dark:divide-stone-900/50 border-t border-slate-100 dark:border-stone-900/50">
                  <button
                    onClick={() => setApplianceToEdit(app)}
                    className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-slate-50 dark:hover:bg-stone-900/50 transition-colors cursor-pointer"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    {tCard("edit")}
                  </button>
                  <button
                    onClick={() => setApplianceToDelete(app)}
                    className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {tCard("delete")}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="fixed bottom-6 right-6 sm:hidden z-40">
        <Button
          size="lg"
          className="rounded-full shadow-xl bg-slate-900 hover:bg-slate-800 dark:bg-stone-100 dark:text-stone-900 text-white"
          onClick={handleSaveChanges}
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
        </Button>
      </div>

      <EditApplianceDialog
        appliance={applianceToEdit}
        open={!!applianceToEdit}
        onOpenChange={(open) => !open && setApplianceToEdit(null)}
      />

      <DeleteApplianceDialog
        appliance={applianceToDelete}
        open={!!applianceToDelete}
        onOpenChange={(open) => !open && setApplianceToDelete(null)}
        onDelete={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
