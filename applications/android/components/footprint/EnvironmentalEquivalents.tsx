import React from "react";
import { Text, View } from "react-native";
import { carbonFootprintData } from "@ecowat/shared";

export function EnvironmentalEquivalents() {
  const reductionValue = carbonFootprintData.find((item) =>
    item.title.toLowerCase().includes("reduction"),
  )?.value as string;
  const reductionNumber = Number.parseFloat(reductionValue) || 42;
  const treesPlanted = Math.round(reductionNumber / 21);
  const carTravelAvoided = reductionNumber * 4;
  const ledHours = reductionNumber * 2.85;

  return (
    <View className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <View className="mb-4">
        <Text className="text-xl font-semibold text-slate-950 dark:text-slate-50">
          Environmental Equivalents
        </Text>
        <Text className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {reductionNumber} kg CO₂ Reduced Equals:
        </Text>
      </View>

      <View className="gap-3">
        <View className="rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-900/20">
          <Text className="text-sm text-slate-700 dark:text-slate-300">
            🌳{" "}
            <Text className="font-semibold text-slate-950 dark:text-slate-50">
              {treesPlanted} Trees Planted
            </Text>
          </Text>
        </View>
        <View className="rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-900/20">
          <Text className="text-sm text-slate-700 dark:text-slate-300">
            🚗{" "}
            <Text className="font-semibold text-slate-950 dark:text-slate-50">
              {carTravelAvoided} km
            </Text>{" "}
            of Car Travel Avoided
          </Text>
        </View>
        <View className="rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-900/20">
          <Text className="text-sm text-slate-700 dark:text-slate-300">
            💡{" "}
            <Text className="font-semibold text-slate-950 dark:text-slate-50">
              {Math.round(ledHours)} Hours
            </Text>{" "}
            of LED Lighting Powered
          </Text>
        </View>
        <View className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
          <Text className="text-sm text-slate-700 dark:text-slate-300">
            ♻️{" "}
            <Text className="font-semibold text-slate-950 dark:text-slate-50">
              Significant Household Carbon Savings
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
