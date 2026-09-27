import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { Surface } from "./Surface";

export function ModelSpecificationsCard() {
  const [open, setOpen] = useState(false);

  return (
    <Surface className="mb-5">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen((v) => !v)}
        className="flex-row items-center justify-between"
      >
        <View className="flex-1 pr-3">
          <Text className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
            Model Specifications
          </Text>
          <Text className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
            Technical characteristics of the active machine learning models.
          </Text>
        </View>
        {open ? (
          <ChevronUp size={20} color="#94A3B8" strokeWidth={2} />
        ) : (
          <ChevronDown size={20} color="#94A3B8" strokeWidth={2} />
        )}
      </TouchableOpacity>

      {open ? (
        <View className="mt-4 space-y-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              Forecast Confidence
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              92% score
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              Prediction Horizon
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              7 Days Ahead
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              Last Model Update
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              2 Hours Ago
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              Forecast Method
            </Text>
            <Text className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              Time-Series Machine Learning Model
            </Text>
          </View>
        </View>
      ) : null}
    </Surface>
  );
}

export default ModelSpecificationsCard;
