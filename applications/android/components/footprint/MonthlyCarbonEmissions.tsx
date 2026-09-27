import React from "react";
import { ScrollView, Text, View } from "react-native";
import { BarChart3 } from "lucide-react-native";
import { weeklyTrend } from "@ecowat/shared";

function getMaxEmission() {
  return Math.max(...weeklyTrend.map((item) => item.emission));
}

export function WeeklyCarbonEmissions() {
  const maxEmission = getMaxEmission();
  const totalWeeklyEmissions = weeklyTrend.reduce(
    (sum, item) => sum + item.emission,
    0,
  );
  const averageDailyEmissions = totalWeeklyEmissions / weeklyTrend.length;
  const highestEmission = Math.max(...weeklyTrend.map((item) => item.emission));
  const lowestEmission = Math.min(...weeklyTrend.map((item) => item.emission));

  return (
    <View className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <View className="mb-5 flex-row items-start gap-3">
        <View className="rounded-xl bg-emerald-50 p-2.5 dark:bg-emerald-900/30">
          <BarChart3 size={18} color="#10b981" />
        </View>
        <View className="flex-1">
          <Text className="text-xl font-semibold text-slate-950 dark:text-slate-50">
            Weekly Carbon Emissions
          </Text>
          <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            CO₂ emissions throughout the current week.
          </Text>
        </View>
      </View>

      <View className="h-72 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 px-2 py-4 dark:border-slate-800 dark:bg-slate-900">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "flex-end",
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          {weeklyTrend.map((item) => {
            const height = Math.max((item.emission / maxEmission) * 144, 28);
            return (
              <View
                key={item.day}
                className="w-14 items-center justify-end px-1"
              >
                <View
                  style={{ height }}
                  className="ml-4 w-8 rounded-t-full bg-emerald-500"
                />
                <Text className="ml-2 mt-2 whitespace-nowrap text-[10px] text-slate-400">
                  {item.day}
                </Text>
                <View className="ml-2 mt-1 items-center">
                  <Text className="whitespace-nowrap text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                    {item.emission.toFixed(1)} kg
                  </Text>
                  <Text className="whitespace-nowrap text-[9px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    CO₂
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View className="mt-5 flex-row flex-wrap -mx-1.5">
        <View className="w-full px-1.5 pb-3 md:w-1/3">
          <View className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <Text className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Total Weekly Emissions
            </Text>
            <Text className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50">
              {totalWeeklyEmissions.toFixed(1)} kg CO₂
            </Text>
          </View>
        </View>

        <View className="w-full px-1.5 pb-3 md:w-1/3">
          <View className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <Text className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Average Daily Emissions
            </Text>
            <Text className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50">
              {averageDailyEmissions.toFixed(1)} kg CO₂
            </Text>
          </View>
        </View>

        <View className="w-full px-1.5 pb-3 md:w-1/3">
          <View className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <Text className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Highest / Lowest Emission
            </Text>
            <Text className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50">
              {highestEmission.toFixed(1)} / {lowestEmission.toFixed(1)} kg CO₂
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default WeeklyCarbonEmissions;
