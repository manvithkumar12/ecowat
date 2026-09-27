import React from "react";
import { ForecastKpiData } from "@ecowat/shared";
import { ArrowDownRight, Leaf, ShieldCheck } from "lucide-react-native";
import { View, Text } from "react-native";
import { Surface } from "./Surface";
type ForecastKpiItem = (typeof ForecastKpiData)[number];

type IconComponent = React.ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>;
export function MetricCard({
  title,
  value,
  unit,
  trend,
  trendIcon,
  trendColor,
}: ForecastKpiItem) {
  const trendIconMap: Record<string, IconComponent> = {
    ArrowDownRight,
    Leaf,
    ShieldCheck,
  };

  const TrendIcon = trendIconMap[trendIcon] ?? ArrowDownRight;
  const sparklineTones = trendColor.includes("emerald")
    ? [
        "bg-emerald-400",
        "bg-emerald-500",
        "bg-emerald-400",
        "bg-emerald-500",
        "bg-emerald-400",
      ]
    : [
        "bg-teal-400",
        "bg-teal-500",
        "bg-teal-400",
        "bg-teal-500",
        "bg-teal-400",
      ];

  return (
    <View className="w-1/2 px-2 pb-3">
      <Surface>
        <View className="space-y-3">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1 pr-3">
              <Text className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {title}
              </Text>
              <View className="mt-2 flex-row items-end gap-1">
                <Text className="text-lg font-semibold text-slate-950 dark:text-slate-50">
                  {value}
                </Text>
                {unit ? (
                  <Text className="pb-0.5 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {unit}
                  </Text>
                ) : null}
              </View>
            </View>
            <View className="rounded-2xl bg-emerald-50 p-2 dark:bg-emerald-500/10">
              <TrendIcon size={18} color="#10B981" strokeWidth={2.2} />
            </View>
          </View>

          <View className="flex-row items-end gap-1 rounded-xl bg-slate-100/80 px-3 py-3 dark:bg-slate-800/60">
            <View className={`h-2.5 w-2.5 rounded-full ${sparklineTones[0]}`} />
            <View className={`h-4 w-2.5 rounded-full ${sparklineTones[1]}`} />
            <View className={`h-6 w-2.5 rounded-full ${sparklineTones[2]}`} />
            <View className={`h-3.5 w-2.5 rounded-full ${sparklineTones[3]}`} />
            <View className={`h-5 w-2.5 rounded-full ${sparklineTones[4]}`} />
          </View>

          <View className="flex-row items-center gap-1.5">
            <TrendIcon size={14} color="#10B981" strokeWidth={2.2} />
            <Text className={`text-xs font-semibold ${trendColor}`}>
              {trend}
            </Text>
          </View>
        </View>
      </Surface>
    </View>
  );
}
