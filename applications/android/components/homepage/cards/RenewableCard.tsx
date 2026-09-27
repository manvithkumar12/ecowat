import { StatCard } from "../StatCard";
import { useRenewableAvailability } from "../../../hooks/Homepage/useRenewableAvailability";
import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import RenewablePopup from "../RenewablePopup";

type RenewableStatus = "Low" | "Moderate" | "High" | "Excellent";

const statusFillMap = {
  Low: 35,
  Moderate: 58,
  High: 78,
  Excellent: 92,
} as const;

const statusColorMap = {
  Low: "#F43F5E",
  Moderate: "#F59E0B",
  High: "#10B981",
  Excellent: "#06B6D4",
} as const;

const RenewableStatusGraph = ({ status }: { status: RenewableStatus }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const fill = statusFillMap[status];
  const offset = circumference - (circumference * fill) / 100;

  return (
    <View className="h-12 w-12 items-center justify-center">
      <Svg width={48} height={48} viewBox="0 0 48 48">
        <Circle
          cx="24"
          cy="24"
          r={radius}
          stroke="#E2E8F0"
          strokeWidth="5"
          fill="none"
        />
        <Circle
          cx="24"
          cy="24"
          r={radius}
          stroke={statusColorMap[status]}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          rotation="-90"
          originX="24"
          originY="24"
        />
      </Svg>
      <Text className="absolute text-[9px] font-bold text-slate-700 dark:text-slate-200">
        {status === "Moderate" ? "Mod" : status}
      </Text>
    </View>
  );
};

const RenewableCard = () => {
  const { RenewableData, RenewableLoading, RenewableError } =
    useRenewableAvailability();
  const [renewableVisible, setRenewableVisible] = React.useState(false);
  return (
    <>
      <StatCard
        title="Renewable Availability"
        value={
          RenewableData?.score !== undefined ? `${RenewableData.score}%` : "N/A"
        }
        actionLabel="View best hours"
        onActionPress={() => setRenewableVisible(true)}
        loading={RenewableLoading}
        error={RenewableError ? "Renewable data unavailable" : undefined}
        visual={
          RenewableData ? (
            <RenewableStatusGraph status={RenewableData.status} />
          ) : undefined
        }
      />
      {renewableVisible && (
        <RenewablePopup
          renewableVisible={renewableVisible}
          setRenewableVisible={setRenewableVisible}
          renewableData={RenewableData}
          isLoading={RenewableLoading}
          isError={RenewableError}
        />
      )}
    </>
  );
};

export default RenewableCard;
