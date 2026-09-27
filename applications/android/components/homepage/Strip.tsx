import { Text, View } from "react-native";

const impactStats = [
  { label: "Monthly Savings", value: "₹1,284" },
  { label: "Carbon Reduced", value: "18.5 kg CO₂" },
  { label: "Renewable Ratio", value: "82%" },
  { label: "Efficiency Score", value: "92/100" },
];

export function ImpactStrip() {
  return (
    <View className="mb-4 overflow-hidden rounded-[28px] bg-slate-50 dark:bg-[#071126] px-4 py-7 shadow-2xl shadow-slate-950/20">
      <View className="flex-row items-stretch">
        {impactStats.map((stat, index) => (
          <View
            key={stat.label}
            className={`flex-1 items-center justify-center ${index < impactStats.length - 1 ? "border-r border-slate-300 dark:border-white/20" : ""}`}
          >
            <Text className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {stat.label}
            </Text>
            <Text className="mt-3 text-center text-[17px] font-semibold text-emerald-400">
              {stat.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
