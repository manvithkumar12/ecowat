import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
interface Step2Props {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  isValidOtp: boolean;
  showErrors: boolean;
  handleContinue: () => void;
  isDark: boolean;
}
const Step2 = ({
  email,
  otp,
  setOtp,
  isValidOtp,
  showErrors,
  handleContinue,
  isDark,
}: Step2Props) => {
  return (
    <View>
      <Text
        className={`text-3xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
      >
        Enter OTP
      </Text>
      <Text
        className={`mt-2 text-base ${isDark ? "text-slate-300" : "text-slate-600"}`}
      >
        OTP sent to {email}. Enter the 6-digit code to continue.
      </Text>

      <View className="mt-6">
        <Text
          className={`mb-2 text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}
        >
          OTP
        </Text>
        <TextInput
          placeholder="Enter 6 digit OTP"
          placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
          keyboardType="number-pad"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
          className={`rounded-2xl border px-4 py-4 text-base tracking-[0.35em] ${
            isDark
              ? "border-white/10 bg-white/5 text-white"
              : "border-slate-200 bg-slate-50 text-slate-900"
          }`}
        />
        {showErrors && !isValidOtp ? (
          <Text className="mt-2 text-sm text-red-400">Invalid OTP.</Text>
        ) : null}
      </View>

      <Pressable
        onPress={handleContinue}
        className="mt-6 rounded-2xl bg-emerald-500 px-4 py-4 shadow-lg shadow-emerald-500/30 active:opacity-90"
      >
        <Text className="text-center text-base font-semibold text-white">
          Verify OTP
        </Text>
      </Pressable>
    </View>
  );
};

export default Step2;
