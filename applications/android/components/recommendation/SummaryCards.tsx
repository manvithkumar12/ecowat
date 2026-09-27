import React from "react";
import { View, Text } from "react-native";

export function SummaryCards({ data }: { data: any[] }) {
  // render first 4 summary items as full-width cards in recommendation
  const items = data.slice(0, 4);

  return (
    <View className="mb-6">
      <View className="flex-row flex-wrap -mx-2">
        {items.map((item) => {
          const Icon = item.icon as any;
          return (
            <View key={item.title} className="w-1/2 px-2 mb-4">
              <View className="h-[100px] w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="rounded-lg bg-emerald-50 p-2">
                    {Icon && typeof Icon === "function" ? (
                      <Icon size={18} color="#059669" />
                    ) : (
                      <Text>⚡</Text>
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      {item.title}
                    </Text>
                  </View>
                </View>

                <Text className="text-2xl font-semibold text-slate-900 dark:text-slate-300">
                  {item.value}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
