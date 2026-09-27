import React from "react";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { Download, RefreshCw } from "lucide-react-native";

export function FootprintHeader({
  isRefreshing,
  onRefresh,
  onExport,
}: {
  isRefreshing: boolean;
  onRefresh: () => void;
  onExport: () => void;
}) {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#f8fafc" : "#0f172a";

  return (
    <View className="gap-4 lg:flex-row lg:items-start lg:justify-between">
      <View className="max-w-2xl">
        <Text className="text-3xl font-semibold text-slate-950 dark:text-slate-50">
          Carbon Footprint
        </Text>
        <Text className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Track your environmental impact, carbon emissions, and sustainability
          progress.
        </Text>
      </View>

      <View className="flex-row gap-3 lg:justify-end">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onExport}
          className="h-11 flex-1 flex-row items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950"
        >
          <Download size={16} color={iconColor} />
          <Text className="ml-2 text-sm font-medium text-slate-900 dark:text-slate-50">
            Export Report
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onRefresh}
          className="h-11 flex-1 flex-row items-center justify-center rounded-2xl bg-emerald-500 px-4"
        >
          <RefreshCw size={16} color="#ffffff" />
          <Text className="ml-2 text-sm font-semibold text-white">
            {isRefreshing ? "Refreshing..." : "Refresh Recommendations"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
