"use client";
"use no memo"
import React, { useState, useMemo, useContext, useEffect } from "react";
import { Activity, Calendar, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shadcn/ui/button";
import { Card } from "@/shadcn/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Dialog } from "@/shadcn/ui/dialog";

import { useUser } from "@/src/context/userContext";
import { LivePriceContext } from "@/src/context/usePriceData";
import {
  calculateDetailedUsage,
  formatDateLabel,
  formatDateValue,
  past30Days,
  useAddUsedAppliance,
} from "@ecowat/shared";
import ErrorPage from "../../generalComponents/ErroPage";
import AddUsedAppliance from "./sections/AddUsedAppliance";
import TrackerStats from "./sections/TrackerStats";
import Nodata from "./sections/Nodata";
import LivePrice from "./sections/LivePrice";
import AppliancesCards from "./sections/AppliancesCards";
import { useTranslations } from "next-intl";
import { userConsumption } from "@/src/context/usedAppliance.context";

export default function TrackerClient() {
  const tHeader = useTranslations("Tracker.header");
  const tAdd = useTranslations("Tracker.addModal");
  const user = useUser();
  const priceContext = useContext(LivePriceContext);

  const {
    Appliances: appliancesList = [],
    isLoading,
    isError,
    past30DaysCost = 0,
    past30DaysSavings = 0,
    selectedDate: selectedDateStr,
    setSelectedDate: setSelectedDateStr,
    totalAmount: selectedDayCost = 0,
    refetch,
  } = userConsumption();

  const selectedDateObject = useMemo(() => {
    const found = past30Days.find(
      (d) => formatDateValue(d) === selectedDateStr,
    );
    return found || new Date();
  }, [selectedDateStr, past30Days]);

  const currentPrice = priceContext?.PriceData?.currentPrice ?? 0.35;
  const priceUnit = priceContext?.PriceData?.unit ?? "EUR/kWh";
  const hourlyPrices = priceContext?.PriceData?.hourlyPrices || [];
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [addName, setAddName] = useState("");
  const [addRating, setAddRating] = useState("");
  const [addStartTime, setAddStartTime] = useState("12:00");
  const [addEndTime, setAddEndTime] = useState("13:00");

  const { addDuration, addKwh, addTotalPrice } = useMemo(() => {
    const rating = Number(addRating) || 0;
    const { duration, kwh, totalPrice } = calculateDetailedUsage(
      rating,
      addStartTime,
      addEndTime,
      hourlyPrices,
    );
    return { addDuration: duration, addKwh: kwh, addTotalPrice: totalPrice };
  }, [addRating, addStartTime, addEndTime, hourlyPrices]);

  const addMutation = useAddUsedAppliance(selectedDateStr);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName || !addRating || !addStartTime || !addEndTime) {
      toast.error(tAdd("fillAll"));
      return;
    }
    addMutation.mutate(
      {
        applianceName: addName,
        rating: Number(addRating),
        usageHours: addDuration,
        kwh: addKwh,
        totalPrice: addTotalPrice,
        date: selectedDateStr,
        startHour: addStartTime,
        endHour: addEndTime,
      },
      {
        onSuccess: () => {
          toast.success(tAdd("successToast"));
          setAddName("");
          setAddRating("");
          setAddStartTime("12:00");
          setAddEndTime("13:00");
          setIsAddOpen(false);
          refetch();
        },
        onError: (err: any) => {
          toast.error(err.message || tAdd("errorToast"));
        },
      },
    );
  };

  if (!user?.id) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-slate-500 dark:text-stone-400 font-semibold">
          {tHeader("pleaseLogIn")}
        </p>
      </div>
    );
  }

  if (isError) {
    return <ErrorPage type={"TRACKER"} />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-stone-100 bg-linear-to-r from-slate-900 via-slate-700 to-emerald-600 dark:from-stone-100 dark:to-emerald-500 bg-clip-text">
            {tHeader("title")}
          </h1>
          <p className="text-sm text-slate-500 dark:text-stone-400 mt-1.5 leading-relaxed">
            {tHeader("description")}
          </p>
        </div>

        {/* Add Appliance Button (Opens Popup Modal) */}
        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-10 px-4 font-bold flex items-center gap-2 shadow-xs shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          {tHeader("addApplianceLog")}
        </Button>
      </div>

      <TrackerStats
        selectedDateStr={selectedDateStr}
        selectedDateObject={selectedDateObject}
        selectedDayCost={selectedDayCost}
        past30DaysCost={past30DaysCost}
        past30DaysSavings={past30DaysSavings}
        appliancesCount={appliancesList.length}
      />

      {/* Date Selector Dropdown (Below Stats) */}
      <div className="flex items-center gap-3 py-1">
        <span className="text-sm font-bold text-slate-600 dark:text-stone-400">
          {tHeader("auditPeriod")}
        </span>
        <Select value={selectedDateStr} onValueChange={setSelectedDateStr}>
          <SelectTrigger className="w-64 border-slate-250 dark:border-stone-850 hover:bg-slate-55 dark:hover:bg-stone-900 rounded-xl flex items-center gap-2.5 font-bold shadow-xs cursor-pointer">
            <Calendar className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
            <SelectValue placeholder={tHeader("selectDate")} />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#0c0a09] border-slate-200 dark:border-stone-850 rounded-xl max-h-80 overflow-y-auto">
            {past30Days.map((dateItem) => {
              const val = formatDateValue(dateItem);
              return (
                <SelectItem
                  key={val}
                  value={val}
                  className="text-xs font-bold text-slate-700 dark:text-stone-300 cursor-pointer"
                >
                  {formatDateLabel(dateItem)} ({val})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Appliances List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-stone-100 flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-500" />
              {tHeader("usedApplianceList", {
                date: formatDateLabel(selectedDateObject),
              })}
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-44 rounded-2xl bg-slate-150 dark:bg-stone-900/50 animate-pulse border border-slate-200 dark:border-stone-850"
                />
              ))}
            </div>
          ) : appliancesList.length === 0 ? (
            <Card className="border border-dashed border-slate-200 dark:border-stone-800 bg-slate-50/30 dark:bg-[#0c0a09]/10 rounded-2xl p-12 text-center">
              <Nodata selectedDateObject={selectedDateObject} />
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AppliancesCards appliancesList={appliancesList} />
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <LivePrice currentPrice={currentPrice} priceUnit={priceUnit} />
        </div>
      </div>

      {/* Add Appliance Dialog (Popup) */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <AddUsedAppliance
          addMutation={addMutation}
          addName={addName}
          setAddName={setAddName}
          addRating={addRating}
          setAddRating={setAddRating}
          addStartTime={addStartTime}
          setAddStartTime={setAddStartTime}
          addEndTime={addEndTime}
          setAddEndTime={setAddEndTime}
          addDuration={addDuration}
          addKwh={addKwh}
          addTotalPrice={addTotalPrice}
          setIsAddOpen={setIsAddOpen}
          handleAddSubmit={handleAddSubmit}
        />
      </Dialog>
    </div>
  );
}
