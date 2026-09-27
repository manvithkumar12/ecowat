import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Availableappliances } from "@ecowat/shared/";

type DropdownProps = {
  selectedMachine: string;
  onSelectMachine: (machine: string) => void;
  onClose: () => void;
};

export const Dropdown = ({
  selectedMachine,
  onSelectMachine,
  onClose,
}: DropdownProps) => {
  return (
    <View className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      {Availableappliances.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.85}
          onPress={() => {
            onSelectMachine(item.name);
            onClose();
          }}
          className="flex-row items-center justify-between px-3 py-3"
        >
          <Text
            className={`text-sm ${selectedMachine === item.name ? "font-semibold text-emerald-700 dark:text-emerald-400" : "text-slate-950 dark:text-slate-50"}`}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Dropdown;
