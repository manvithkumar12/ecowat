import React from "react";
import { ScrollView, Text, useColorScheme, View } from "react-native";
import { Sparkles, TrendingUp } from "lucide-react-native";
import { ForecastKpiData } from "@ecowat/shared/data/Forecast/kpiCards";
import { MetricCard } from "../../components/forecast/MetricesCard";
import { Surface } from "../../components/forecast/Surface";
import { SectionHeader } from "../../components/forecast/SectionHeader";
import { MiniChart } from "../../components/forecast/MiniChart";
import PredictedCostGraph from "../../components/forecast/PredictedCostGraph";
import PredictedEmissionsGraph from "../../components/forecast/PredictedEmissionsGraph";
import ModelSpecificationsCard from "../../components/forecast/ModelSpecificationsCard";

export type IconComponent = React.ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>;

export default function ForecastScreen() {
  const colorScheme = useColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-slate-950"
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 120,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-5">
        <Text className="text-3xl font-semibold text-slate-950 dark:text-slate-50">
          Forecast
        </Text>
        <Text className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
          Predicted energy usage and cost trends.
        </Text>
      </View>

      <ModelSpecificationsCard />

      <Surface className="mb-5 overflow-hidden p-0">
        <View className={`p-5 ${dark ? "bg-slate-900" : "bg-emerald-50"}`}>
          <View className="mb-4 flex-row items-center justify-between">
            <View className="rounded-2xl bg-white/80 px-3 py-1 dark:bg-slate-950/35">
              <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                Energy Forecast
              </Text>
            </View>
            <View className="flex-row items-center rounded-full bg-white/85 px-3 py-1 dark:bg-slate-950/35">
              <TrendingUp size={14} color="#10B981" strokeWidth={2.2} />
              <Text className="ml-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ↑ 3.2% from today
              </Text>
            </View>
          </View>

          <Text className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Estimated consumption for tomorrow.
          </Text>
          <View className="mt-3 flex-row items-end justify-between">
            <Text className="text-5xl font-semibold text-emerald-950 dark:text-emerald-400">
              24.8 kWh
            </Text>
            <View className="rounded-3xl bg-white px-3 py-3 shadow-sm shadow-black/5 dark:bg-slate-950/35">
              <Sparkles size={18} color="#10B981" strokeWidth={2.2} />
            </View>
          </View>
        </View>
      </Surface>

      <View className="-mx-2 mb-2 flex-row flex-wrap">
        {ForecastKpiData.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </View>

      <Surface className="mb-5">
        <SectionHeader
          title="7-Day Consumption Forecast"
          subtitle="Simple usage trend for the coming week."
        />
        <MiniChart dark={dark} />
      </Surface>

      <Surface className="mb-5">
        <PredictedCostGraph dark={dark} />
      </Surface>

      <Surface className="mb-5">
        <PredictedEmissionsGraph dark={dark} />
      </Surface>
    </ScrollView>
  );
}
