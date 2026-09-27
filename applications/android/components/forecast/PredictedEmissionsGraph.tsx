import React from "react";
import { View, Text } from "react-native";

export function PredictedEmissionsGraph({ dark }: { dark?: boolean }) {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = [8, 10, 9, 9, 9, 14, 9];
  const max = Math.max(...values);

  return (
    <View className="p-4">
      <View className="mb-3">
        <Text className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
          Predicted Carbon Emissions
        </Text>
        <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Estimated environmental impact based on forecasted energy consumption.
        </Text>
      </View>

      <View className="mb-4 flex-row items-end justify-between">
        {values.map((v, i) => {
          const height = Math.max((v / max) * 120, 10);
          const isHighest = v === max;
          const isLowest = v === Math.min(...values);
          return (
            <View key={labels[i]} className="flex-1 items-center px-1">
              <View
                style={{ height }}
                className={`w-6 rounded-t-lg ${
                  isHighest
                    ? "bg-rose-500"
                    : isLowest
                      ? "bg-emerald-300"
                      : "bg-sky-500"
                }`}
              />
              <Text className="mt-2 text-xs font-semibold text-slate-950 dark:text-slate-50">
                {v} kg
              </Text>
              <Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {labels[i]}
              </Text>
            </View>
          );
        })}
      </View>

      <View className="rounded-2xl border border-slate-200/70 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-slate-500 dark:text-slate-400">
              Total Weekly
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              68 kg
            </Text>
          </View>
          <View>
            <Text className="text-xs text-slate-500 dark:text-slate-400">
              Highest Emission
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              Saturday
            </Text>
          </View>
          <View>
            <Text className="text-xs text-slate-500 dark:text-slate-400">
              Lowest Emission
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              Monday
            </Text>
          </View>
          <View>
            <Text className="text-xs text-slate-500 dark:text-slate-400">
              Daily Average
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              9.7 kg
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PredictedEmissionsGraph;
