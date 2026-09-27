import { View, Text } from "react-native";
import { sevenDayForecastData } from "@ecowat/shared";

export function MiniChart({ dark }: { dark: boolean }) {
  const data = sevenDayForecastData;
  const values = data.map((d) => d.predicted);
  const max = Math.max(...values);
  const lowBar = dark ? "bg-emerald-950" : "bg-emerald-200";

  return (
    <View className="mt-2 rounded-2xl border border-slate-200/70 bg-white px-3 py-4 dark:border-slate-800 dark:bg-slate-950">
      <View className="relative h-56">
        <View className="absolute left-0 right-0 top-4 h-px bg-slate-200 dark:bg-slate-800" />
        <View className="absolute left-0 right-0 top-1/2 h-px bg-slate-200 dark:bg-slate-800" />
        <View className="absolute left-0 right-0 bottom-14 h-px bg-slate-200 dark:bg-slate-800" />

        <View className="absolute inset-x-0 bottom-0 flex-row items-end justify-between px-1">
          {data.map((d, index) => {
            const value = d.predicted;
            const label = d.name;
            const height = Math.max((value / max) * 112, 26);
            const isActive = index === 2;
            return (
              <View key={label} className="flex-1 items-center px-1">
                <View
                  style={{ height }}
                  className={`w-4 rounded-full ${isActive ? "bg-emerald-500" : lowBar}`}
                />
                <Text className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {label}
                </Text>
                <Text className="mt-1 text-xs font-semibold text-slate-950 dark:text-slate-50">
                  {value}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
