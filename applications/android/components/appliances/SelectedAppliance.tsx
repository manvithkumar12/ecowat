import React, { SetStateAction } from "react";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Trash2 } from "lucide-react-native";
import { Appliance, useApplianceDelete } from "@ecowat/shared";
import {
  getConsumption,
  isEnabled,
} from "../../utils/appliances/appliancesTotal";
import { BASE_URL } from "../../config/Keys";

type SelectedApplianceProps = {
  selectedAppliance: Appliance | null;
  setdetailModalVisible: React.Dispatch<SetStateAction<boolean>>;
  onToggle: (nextValue: boolean) => void;
  userId: string;
};

export default function SelectedAppliance({
  selectedAppliance,
  onToggle,
  userId,
  setdetailModalVisible,
}: SelectedApplianceProps) {
  const deletemutuation = useApplianceDelete(BASE_URL);
  if (!selectedAppliance) return null;
  const onDelete = () => {
    deletemutuation.mutate(selectedAppliance.id, {
      onSuccess: () => {
        setdetailModalVisible(false);
      },
      onError: () => {
        ToastAndroid.show("ERROR", ToastAndroid.SHORT);
      },
    });
  };
  const enabled = isEnabled(selectedAppliance);

  return (
    <View className="mt-5 flex flex-col gap-3 space-y-3">
      <View className="flex-row items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
        <Text className="text-lg text-slate-500 dark:text-slate-400">
          Status
        </Text>
        <View className="h-10 flex-row items-center gap-2">
          <Text className="text-lg font-semibold text-slate-950 dark:text-slate-50">
            {enabled ? "On" : "Off"}
          </Text>
          <View
            className={`rounded-full px-2 py-0.5 ${enabled ? "bg-emerald-100 dark:bg-emerald-900/20" : "bg-slate-200 dark:bg-slate-700"}`}
          >
            <Text
              className={`text-md font-semibold ${enabled ? "text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-300"}`}
            >
              {enabled ? "Enabled" : "Disabled"}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
        <Text className="text-lg text-slate-500 dark:text-slate-400">
          Consumption
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-lg font-semibold text-slate-950 dark:text-slate-50"
        >
          {getConsumption(selectedAppliance)}
        </Text>
      </View>

      <View className="flex-row items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
        <Text className="text-lg text-slate-500 dark:text-slate-400">
          Power
        </Text>
        <Text className="text-lg font-semibold text-slate-950 dark:text-slate-50">
          {selectedAppliance.powerRatingW} W
        </Text>
      </View>

      <View className="flex-row items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
        <Text className="text-lg text-slate-500 dark:text-slate-400">
          Daily Usage
        </Text>
        <Text className="text-lg font-semibold text-slate-950 dark:text-slate-50">
          {selectedAppliance.dailyUsageHours} h
        </Text>
      </View>

      <TouchableOpacity
        className="mt-2 flex-row items-center justify-center rounded-2xl bg-rose-500 px-4 py-3"
        activeOpacity={0.9}
        onPress={onDelete}
      >
        <Trash2 size={16} color="#fff" />
        <Text className="ml-2 text-lg font-semibold text-white">
          Delete Appliance
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-2 flex-row items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700"
        activeOpacity={0.9}
        onPress={() => onToggle(!enabled)}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-lg font-semibold text-slate-700 dark:text-slate-200"
        >
          Toggle {enabled ? "Off" : "On"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
