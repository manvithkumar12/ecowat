import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronRight, Plus, Thermometer, Zap } from "lucide-react-native";
import { SummaryCard } from "../../components/appliances/SummaryCard";
import { EmptyState } from "../../components/appliances/EmptyState";
import { Appliance, useAddAppliance, useUserAppliance } from "@ecowat/shared";
import { getTotalConsumption } from "../../utils/appliances/appliancesTotal";
import { SearchInput } from "../../utils/appliances/SearchInput";
import { ApplianceCard } from "../../utils/appliances/applianceCard";
import SelectedAppliance from "../../components/appliances/SelectedAppliance";
import { BASE_URL } from "../../config/Keys";
import { useUser } from "../../context/Userprovider";
import ApplianceAdd from "../../components/appliances/ApplianceAdd";

const MACHINE_OPTIONS = [
  "EV Charger",
  "Heat Pump",
  "Washing Machine",
  "Dishwasher",
  "Electric Water Heater",
  "Fridge",
  "AC",
];

export default function AppliancesScreen() {
  const user = useUser();
  if (!user?.id) {
    return null;
  }
  const {
    data: userAppliances,
    isLoading,
    isError,
    error,
  } = useUserAppliance(BASE_URL);

  const [query, setQuery] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [machineDropdownOpen, setMachineDropdownOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState("Select");
  const [powerWatts, setPowerWatts] = useState("0");
  const [dailyUsage, setDailyUsage] = useState("0");
  const addmutuation = useAddAppliance(BASE_URL);
  const [selectedAppliance, setSelectedAppliance] = useState<Appliance | null>(
    null,
  );
  const TARIFF_PER_KWH = 0.35;

  const estimatedDailyConsumption = useMemo(() => {
    return userAppliances?.reduce((total, app) => {
      return total + (app.powerRatingW * app.dailyUsageHours) / 1000;
    }, 0);
  }, [userAppliances]);

  const estimatedMonthlyCost = useMemo(() => {
    return estimatedDailyConsumption || 0 * 30 * TARIFF_PER_KWH;
  }, [estimatedDailyConsumption]);

  const filtered = useMemo(
    () =>
      userAppliances?.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [userAppliances, query],
  );

  const openAddModal = () => {
    setSelectedMachine("Select");
    setPowerWatts("0");
    setDailyUsage("0");
    setMachineDropdownOpen(false);
    setAddModalVisible(true);
  };

  const saveAppliance = (newAppliance: Omit<Appliance, "id">) => {
    addmutuation.mutate(newAppliance, {
      onSuccess: () => {
        ToastAndroid.show("SUCCESS", ToastAndroid.SHORT);
      },
      onError: (error) => {
        ToastAndroid.show("ERROR", ToastAndroid.SHORT);
        console.log(error);
      },
    });
  };
  const openDetails = (item: Appliance) => {
    setSelectedAppliance(item);
    setDetailModalVisible(true);
  };
  return (
    <ScrollView
      className="flex-1 bg-[#FFFFFF] p-4 dark:bg-[#020617]"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-4">
        <Text className="text-3xl font-semibold text-slate-950 dark:text-slate-50">
          My Appliances
        </Text>
        <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage appliances used for forecasting and energy optimization.
        </Text>
      </View>

      <View className="mb-3 h-[112px] overflow-hidden">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <SummaryCard
            title="Total Appliances"
            value={`${userAppliances?.length}`}
            icon={Zap}
          />
          <SummaryCard
            title="Daily Consumption"
            value={`${getTotalConsumption(userAppliances ?? [])} kWh`}
            icon={Thermometer}
          />
          <SummaryCard
            title="Monthly Cost"
            value={`€${estimatedMonthlyCost.toFixed(2)}`}
            icon={Zap}
          />
        </ScrollView>
      </View>

      <SearchInput value={query} onChange={setQuery} />

      <TouchableOpacity
        className="mt-4 h-[52px] w-full flex-row items-center justify-center rounded-2xl bg-emerald-500"
        activeOpacity={0.9}
        onPress={openAddModal}
      >
        <Plus size={16} color="#fff" />
        <Text className="ml-2 text-sm font-semibold text-white">
          Add Appliance
        </Text>
      </TouchableOpacity>

      <View className="mt-4">
        {!filtered || filtered.length === 0 ? (
          <EmptyState onAdd={openAddModal} />
        ) : (
          filtered.map((item) => (
            <ApplianceCard
              key={item.id}
              item={item}
              onPress={() => openDetails(item)}
              onToggle={(nextValue) => {
                console.log("Toggle:", nextValue);
              }}
            />
          ))
        )}
      </View>
      <ApplianceAdd
        addModalVisible={addModalVisible}
        setAddModalVisible={setAddModalVisible}
        machineDropdownOpen={machineDropdownOpen}
        setMachineDropdownOpen={setMachineDropdownOpen}
        selectedMachine={selectedMachine}
        setSelectedMachine={setSelectedMachine}
        powerWatts={powerWatts}
        setPowerWatts={setPowerWatts}
        dailyUsage={dailyUsage}
        setDailyUsage={setDailyUsage}
        saveAppliance={saveAppliance}
      />

      <Modal
        visible={detailModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/40 px-4"
          onPress={() => setDetailModalVisible(false)}
        >
          <Pressable
            className="w-full rounded-3xl border border-slate-600 bg-white p-5 dark:border-slate-500 dark:bg-slate-900"
            onPress={() => null}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <View className="mb-2 flex-row items-center">
                  <View className="rounded-full bg-emerald-50 px-2 py-1 dark:bg-emerald-900/20">
                    <Text className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      Details
                    </Text>
                  </View>
                </View>
                <Text className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                  {selectedAppliance?.name ?? "Appliance"}
                </Text>
                <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Full appliance information and actions.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
                <ChevronRight size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {selectedAppliance ? (
              <SelectedAppliance
                selectedAppliance={selectedAppliance}
                setdetailModalVisible={setDetailModalVisible}
                onToggle={(nextValue) => {
                  console.log("Toggle:", nextValue);
                }}
                userId={user.id}
              />
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}
