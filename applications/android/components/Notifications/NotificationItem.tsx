import React from "react";
import { Text, View, useColorScheme } from "react-native";
import { Bell } from "lucide-react-native";

export type NotificationItemProps = {
  title: string;
  message: string;
  time: string;
  unread?: boolean;
};

export default function NotificationItem({
  title,
  message,
  time,
  unread = false,
}: NotificationItemProps) {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#d1fae5" : "#065f46";

  return (
    <View className="flex-row items-start rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <View className="mr-3 rounded-2xl bg-emerald-50 p-3 dark:bg-emerald-900/20">
        <Bell size={18} color={iconColor} />
      </View>

      <View className="flex-1">
        <View className="mb-1 flex-row items-center justify-between">
          <Text className="mr-3 flex-1 text-base font-semibold text-slate-950 dark:text-slate-50">
            {title}
          </Text>
          {unread ? (
            <View className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          ) : null}
        </View>
        <Text className="text-sm leading-5 text-slate-500 dark:text-slate-400">
          {message}
        </Text>
        <Text className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
          {time}
        </Text>
      </View>
    </View>
  );
}
