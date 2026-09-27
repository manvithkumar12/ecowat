import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import Dropdown from "../../utils/appliances/Dropdown";
import { Appliance, Availableappliances } from "@ecowat/shared";

interface Addprops {
  addModalVisible: boolean;
  setAddModalVisible: (value: boolean) => void;
  machineDropdownOpen: boolean;
  setMachineDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMachine: string;
  setSelectedMachine: (value: string) => void;
  powerWatts: string;
  setPowerWatts: (value: string) => void;
  dailyUsage: string;
  setDailyUsage: (value: string) => void;
  saveAppliance: (newAppliance: Omit<Appliance, "id">) => void;
}
const ApplianceAdd = ({
  addModalVisible,
  setAddModalVisible,
  machineDropdownOpen,
  setMachineDropdownOpen,
  selectedMachine,
  setSelectedMachine,
  powerWatts,
  setPowerWatts,
  dailyUsage,
  setDailyUsage,
  saveAppliance,
}: Addprops) => {
  return (
    <>
      <Modal
        visible={addModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <Pressable
          className="flex-1 justify-end bg-black/30"
          onPress={() => setAddModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="rounded-t-3xl bg-white p-4 dark:bg-slate-900"
            onStartShouldSetResponder={() => true}
          >
            <Text className="text-lg font-semibold text-slate-950 dark:text-slate-50">
              Add Appliance
            </Text>
            <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Enter appliance details
            </Text>

            <View className="mt-4">
              <Text className="text-xs text-slate-500 dark:text-slate-400">
                Machine
              </Text>
              <TouchableOpacity
                onPress={() => setMachineDropdownOpen((value) => !value)}
                className="mt-2 flex-row items-center justify-between rounded-2xl border border-slate-200 px-3 py-3 dark:border-slate-700"
                activeOpacity={0.85}
              >
                <Text className="text-sm text-slate-950 dark:text-slate-50">
                  {selectedMachine}
                </Text>
                {machineDropdownOpen ? (
                  <ChevronUp size={16} color="#94A3B8" />
                ) : (
                  <ChevronDown size={16} color="#94A3B8" />
                )}
              </TouchableOpacity>

              {machineDropdownOpen ? (
                <Dropdown
                  selectedMachine={selectedMachine}
                  onSelectMachine={setSelectedMachine}
                  onClose={() => setMachineDropdownOpen(false)}
                />
              ) : null}
            </View>

            <View className="mt-4">
              <Text className="text-xs text-slate-500 dark:text-slate-400">
                Power (Watts)
              </Text>
              <TextInput
                value={powerWatts}
                onChangeText={setPowerWatts}
                keyboardType="numeric"
                className="mt-2 rounded-2xl border border-slate-200 px-3 py-3 text-slate-950 dark:border-slate-700 dark:text-slate-50"
              />
            </View>

            <View className="mt-4">
              <Text className="text-xs text-slate-500 dark:text-slate-400">
                Daily Usage (hours)
              </Text>
              <TextInput
                value={dailyUsage}
                onChangeText={setDailyUsage}
                keyboardType="numeric"
                className="mt-2 rounded-2xl border border-slate-200 px-3 py-3 text-slate-950 dark:border-slate-700 dark:text-slate-50"
              />
            </View>

            <View className="mt-6 flex-row gap-3">
              <TouchableOpacity
                onPress={() => setAddModalVisible(false)}
                className="h-[52px] flex-1 items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-700"
                activeOpacity={0.85}
              >
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  saveAppliance({
                    name: selectedMachine,
                    powerRatingW: Number(powerWatts),
                    dailyUsageHours: Number(dailyUsage),
                    status: true,
                    DBName: selectedMachine.replace(/\s+/g, "").toLowerCase(),
                    category:
                      Availableappliances.find(
                        (e) => e.name === selectedMachine,
                      )?.category ?? "Other",
                  })
                }
                className="h-[52px] flex-1 items-center justify-center rounded-2xl bg-emerald-500"
                activeOpacity={0.9}
              >
                <Text className="text-sm font-semibold text-white">
                  Save Appliance
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </>
  );
};

export default ApplianceAdd;
