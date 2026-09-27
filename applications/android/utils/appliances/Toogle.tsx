import React from "react";
import { Animated, Easing, View, Text, TouchableOpacity } from "react-native";

export function ApplianceToggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (nextValue: boolean) => void;
}) {
  const translateX = React.useRef(new Animated.Value(value ? 20 : 2)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 20 : 2,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [translateX, value]);

  return (
    <View className="flex-row items-center gap-2">
      <Text
        className={`text-md font-semibold ${value ? "text-emerald-700 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`}
      >
        {value ? "On" : "Off"}
      </Text>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onChange(!value)}
        className={`h-8 w-14 rounded-full p-0.5 ${value ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"}`}
      >
        <Animated.View
          style={{ transform: [{ translateX }] }}
          className="h-7 w-7 rounded-full bg-white shadow-sm"
        />
      </TouchableOpacity>
    </View>
  );
}
