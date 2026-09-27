import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useColorScheme,
} from "react-native";
import NotificationsHeader from "../../components/Notifications/NotificationsHeader";
import NotificationStateView, {
  NotificationState,
} from "../../components/Notifications/NotificationStateView";

const STATES: Array<{ label: string; value: NotificationState }> = [
  { label: "Loading", value: "loading" },
  { label: "Messages", value: "messages" },
  { label: "Empty", value: "empty" },
];

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const [state, setState] = useState<NotificationState>("loading");

  const notifications = useMemo(
    () => [
      {
        title: "Energy usage update",
        message:
          "Your consumption dropped by 12% this week compared to last week.",
        time: "2m ago",
        unread: true,
      },
      {
        title: "Forecast ready",
        message: "A fresh carbon and cost forecast is ready for review.",
        time: "15m ago",
        unread: false,
      },
    ],
    [],
  );

  const backgroundClass =
    colorScheme === "dark" ? "bg-slate-950" : "bg-slate-50";
  const cardClass =
    colorScheme === "dark"
      ? "border-slate-800 bg-slate-900"
      : "border-slate-200 bg-white";

  return (
    <ScrollView
      className={`flex-1 ${backgroundClass}`}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 px-5 py-6">
        <View className={`rounded-[32px] border p-5 ${cardClass}`}>
          <NotificationsHeader subtitle="Track loading, empty, and received message states." />

          <View className="mt-5 flex-row rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
            {STATES.map((item) => {
              const active = state === item.value;
              return (
                <Pressable
                  key={item.value}
                  onPress={() => setState(item.value)}
                  className={`flex-1 rounded-2xl px-4 py-3 ${
                    active ? "bg-emerald-500" : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`text-center text-sm font-semibold ${
                      active
                        ? "text-white"
                        : "text-slate-500 dark:text-slate-300"
                    }`}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View className="mt-5">
            <NotificationStateView
              state={state}
              notifications={notifications}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
