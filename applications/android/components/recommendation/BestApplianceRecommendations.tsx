import React from "react";
import { View, Text } from "react-native";
import { AlertTriangle } from "lucide-react-native";

type Rec = {
  name: string;
  bestTime: string;
  reason: string;
  savings?: string;
  priority: "High" | "Medium" | "Low";
};

function priorityStyles(priority: Rec["priority"]) {
  switch (priority) {
    case "High":
      return "bg-rose-50 text-rose-700";
    case "Medium":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-emerald-50 text-emerald-700";
  }
}

export function BestApplianceRecommendations({ data }: { data: Rec[] }) {
  return (
    <View className="mb-6">
      <Text className="text-xl font-semibold text-slate-900 dark:text-slate-50">
        Best Time to Use Appliances
      </Text>

      <View className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((rec) => (
          <View
            key={rec.name}
            className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 dark:border-slate-600 p-4 shadow-lg border border-slate-100"
            style={{ elevation: 2 }}
          >
            {/* green accent bar */}
            <View className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600/90" />

            <View className="flex-row items-start">
              <View className="mr-4 items-center">
                <View className="rounded-lg bg-emerald-50 p-3 border border-emerald-100">
                  <AlertTriangle size={18} color="#059669" />
                </View>
              </View>

              <View className="flex-1">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-4">
                    <Text className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {rec.name}
                    </Text>
                    <Text className="mt-1 text-sm text-slate-500 dark:text-slate-300 leading-tight">
                      {rec.reason}
                    </Text>
                  </View>

                  <View className="items-end">
                    <View
                      className={`${priorityStyles(rec.priority)} rounded-full px-3 py-1`}
                    >
                      <Text className="text-xs font-semibold">
                        {rec.priority}
                      </Text>
                    </View>
                    {rec.bestTime.toLowerCase().includes("now") ? (
                      <View className="rounded-full bg-emerald-600 px-2 py-1 mt-2">
                        <Text className="text-xs text-white">
                          Recommended Now
                        </Text>
                      </View>
                    ) : (
                      <Text className="text-sm text-slate-400 mt-2">
                        {rec.bestTime}
                      </Text>
                    )}
                  </View>
                </View>

                {rec.savings ? (
                  <View className="mt-4 flex-row items-center justify-between">
                    <Text className="text-sm text-slate-700 dark:text-slate-300">
                      Potential savings:{" "}
                      <Text className="font-semibold">{rec.savings}</Text>
                    </Text>
                    <View className="rounded-full bg-emerald-50 px-3 py-1 border border-emerald-100">
                      <Text className="text-xs text-emerald-700 dark:text-emerald-300">
                        Estimated
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default BestApplianceRecommendations;
