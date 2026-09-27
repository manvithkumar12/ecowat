import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { RefreshCw, BarChart2 } from "lucide-react-native";

export default function RecommendationHeader() {
  const colorScheme = useColorScheme();
  const refreshIconColor = colorScheme === "dark" ? "#FFFFFF" : "#0F172A";

  return (
    <View className="mb-6">
      <View className="flex-1">
        <Text className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
          Smart Recommendations
        </Text>
        <Text className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          AI-powered suggestions to reduce electricity costs and maximize
          renewable energy usage.
        </Text>
      </View>

      <View className="mt-4 flex-row items-center gap-3">
        <TouchableOpacity
          className="rounded-2xl px-3 py-2 border border-slate-200"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center">
            <RefreshCw size={16} color={refreshIconColor} />
            <Text className="ml-2 text-sm text-slate-900 dark:text-slate-50">
              Refresh Recommendations
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-2xl bg-emerald-500 px-3 py-2"
          activeOpacity={0.9}
        >
          <View className="flex-row items-center">
            <BarChart2 size={16} color="#fff" />
            <Text className="ml-2 text-sm font-semibold text-white">
              View Forecast Data
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
