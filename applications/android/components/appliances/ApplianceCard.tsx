import React from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import { ChevronRight, Thermometer, Zap } from "lucide-react-native";
import { Appliance } from "@ecowat/shared";

const isFlexibleAppliance = (name: string) =>
  name === "EV Charger" ||
  name === "Heat Pump" ||
  name === "Washing Machine" ||
  name === "Dishwasher";

const getApplianceIcon = (name: string) =>
  name === "Heat Pump" || name === "Electric Water Heater" ? Thermometer : Zap;

const getConsumption = (item: Appliance) =>
  `${((item.powerRatingW * item.dailyUsageHours) / 1000).toFixed(1)} kWh/day`;

const isEnabled = (item: Appliance) => item.status === true;

function ApplianceToggle({
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
        className={`text-xs font-semibold ${value ? "text-emerald-700 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`}
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

export function ApplianceCard({
  item,
  onPress,
  onToggle,
}: {
  item: Appliance;
  onPress: () => void;
  onToggle: (nextValue: boolean) => void;
}) {
  const Icon = getApplianceIcon(item.category);
  const flexible = isFlexibleAppliance(item.name);

  return (
    <View className="mb-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <View className="flex-row items-center justify-between gap-3">
        <TouchableOpacity
          activeOpacity={0.86}
          onPress={onPress}
          className="flex-1 pr-2"
        >
          <View className="flex-row items-center">
            <View className="mr-3 rounded-full bg-emerald-50 p-3 dark:bg-emerald-900/20">
              <Icon size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-slate-950 dark:text-slate-50">
                {item.name}
              </Text>
              <View className="mt-1 flex-row flex-wrap items-center">
                <Text className="text-xs text-slate-500 dark:text-slate-400">
                  {item.status}
                </Text>
                <Text className="mx-2 text-xs text-slate-300">•</Text>
                <Text className="text-xs text-slate-500 dark:text-slate-400">
                  {getConsumption(item)}
                </Text>
                {flexible ? (
                  <>
                    <Text className="mx-2 text-xs text-slate-300">•</Text>
                    <View className="rounded-full bg-emerald-100 px-2 py-0.5 dark:bg-emerald-900/20">
                      <Text className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        Flexible
                      </Text>
                    </View>
                  </>
                ) : null}
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View className="items-end">
          <ApplianceToggle value={isEnabled(item)} onChange={onToggle} />
          <View className="mt-3">
            <ChevronRight size={20} color="#94A3B8" />
          </View>
        </View>
      </View>
    </View>
  );
}
