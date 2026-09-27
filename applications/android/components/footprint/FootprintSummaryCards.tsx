import React from "react";
import { Text, View } from "react-native";
import { BarChart2, Leaf, RefreshCw, TrendingUp } from "lucide-react-native";
import { carbonFootprintData } from "@ecowat/shared";

const iconMap = {
  BarChart2,
  TrendingUp,
  Leaf,
  RefreshCw,
} as const;

export function FootprintSummaryCards() {
  return (
    <View className="flex-row flex-wrap -mx-2">
      {carbonFootprintData.map((card) => {
        const Icon = iconMap[card.icon as keyof typeof iconMap] ?? BarChart2;

        return (
          <View key={card.title} className="w-1/2 px-2 mb-4">
            <View className="h-[132px] w-full justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <View className="flex-row items-center gap-3">
                <View className="rounded-xl bg-emerald-50 p-2.5 dark:bg-emerald-900/30">
                  <Icon size={18} color="#10b981" />
                </View>
                <Text
                  numberOfLines={1}
                  className="flex-1 text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  {card.title}
                </Text>
              </View>

              <Text className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                {card.value}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
