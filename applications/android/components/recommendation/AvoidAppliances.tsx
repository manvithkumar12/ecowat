import React from "react";
import { View, Text, ScrollView } from "react-native";
import { AlertTriangle } from "lucide-react-native";

type Avoid = {
  name: string;
  bestTime: string;
  reason: string;
  savings?: string;
};

export function AvoidAppliances({ data }: { data: Avoid[] }) {
  return (
    <View className="mb-6">
      <Text className="text-xl font-semibold text-slate-900 dark:text-slate-50">
        Appliances to Avoid Right Now
      </Text>

      <ScrollView
        className="mt-4"
        style={{ maxHeight: 420 }}
        contentContainerStyle={{ paddingBottom: 12 }}
        showsVerticalScrollIndicator
      >
        <View className="flex-col gap-4">
          {data.map((item) => (
            <View
              key={item.name}
              className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 dark:border-slate-600 p-4 shadow-lg border border-slate-100"
              style={{ elevation: 3 }}
            >
              {/* left accent bar */}
              <View className="absolute left-0 top-0 bottom-0 w-1 bg-red-600/90" />

              <View className="flex-row items-start">
                <View className="mr-4 items-center">
                  <View className="rounded-lg bg-red-50 p-3 border border-red-100">
                    <AlertTriangle size={18} color="#DC2626" />
                  </View>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-4">
                      <Text className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                        {item.name}
                      </Text>
                      <Text className="mt-1 text-sm text-slate-500 dark:text-slate-300 leading-tight">
                        {item.reason}
                      </Text>
                    </View>

                    <View className="items-end">
                      <View className="rounded-full bg-red-50 px-3 py-1 border border-red-100">
                        <Text className="text-xs font-semibold text-red-700">
                          Avoid
                        </Text>
                      </View>
                      <Text className="mt-2 text-sm text-slate-400">
                        {item.bestTime}
                      </Text>
                    </View>
                  </View>

                  {item.savings ? (
                    <View className="mt-4 flex-row items-center justify-between">
                      <Text className="text-sm text-red-700">
                        Estimated extra cost:
                        <Text className="font-semibold text-red-800">
                          {" "}
                          {item.savings}
                        </Text>
                      </Text>

                      <View className="rounded-full bg-red-50 px-3 py-1 border border-red-100">
                        <Text className="text-xs text-red-900">
                          Higher cost
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
