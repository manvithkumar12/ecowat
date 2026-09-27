import React from "react";
import { Text, View, useColorScheme } from "react-native";

type NotificationsHeaderProps = {
  subtitle: string;
};

export default function NotificationsHeader({
  subtitle,
}: NotificationsHeaderProps) {
  const colorScheme = useColorScheme();
  const themeLabel = colorScheme === "dark" ? "Dark mode" : "Light mode";

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-3xl font-semibold text-slate-950 dark:text-slate-50">
            Notifications
          </Text>
          <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </Text>
        </View>

        <View className="rounded-full border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
          <Text className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500 dark:text-emerald-400">
            {themeLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}
