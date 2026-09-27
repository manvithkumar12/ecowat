import React from "react";
import { View, Text } from "react-native";

export function PredictedCostGraph({ dark }: { dark?: boolean }) {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = [100, 130, 160, 190, 220, 205, 180];
  const max = Math.max(...values);

  return (
    <View className="p-4">
      <View className="mb-3">
        <Text className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
          Predicted Daily Electricity Cost
        </Text>
        <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Expected electricity spending based on forecasted usage and pricing.
        </Text>
      </View>

      <View className="mb-4 flex-row items-end justify-between">
        {values.map((v, i) => {
          const height = Math.max((v / max) * 120, 10);
          const isHighest = v === max;
          return (
            <View key={labels[i]} className="flex-1 items-center px-1">
              <View
                style={{ height }}
                className={`w-6 rounded-t-lg ${
                  isHighest ? "bg-rose-500" : "bg-emerald-500"
                }`}
              />
              <Text className="mt-2 text-xs font-semibold text-slate-950 dark:text-slate-50">
                ₹{v}
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
              Highest Cost
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              Saturday
            </Text>
          </View>
          <View>
            <Text className="text-xs text-slate-500 dark:text-slate-400">
              Estimated Cost
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              ₹205
            </Text>
          </View>
          <View>
            <Text className="text-xs text-slate-500 dark:text-slate-400">
              Daily Average
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              ₹180
            </Text>
          </View>
          <View>
            <Text className="text-xs text-slate-500 dark:text-slate-400">
              Weekly Total
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              ₹1,280
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PredictedCostGraph;
