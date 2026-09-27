import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

interface Step3Props {
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  isValidNewPassword: boolean;
  passwordsMatch: boolean;
  showErrors: boolean;
  handleContinue: () => void;
  isDark: boolean;
}

const Step3 = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  isValidNewPassword,
  passwordsMatch,
  showErrors,
  handleContinue,
  isDark,
}: Step3Props) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View>
      <Text
        className={`text-3xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
      >
        Create New Password
      </Text>
      <Text
        className={`mt-2 text-base ${isDark ? "text-slate-300" : "text-slate-600"}`}
      >
        Set a new password for your account.
      </Text>

      <View className="mt-6 gap-4">
        <View>
          <Text
            className={`mb-2 text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}
          >
            New Password
          </Text>
          <View className="relative">
            <TextInput
              placeholder="Enter new password"
              placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              className={`rounded-2xl border px-4 py-4 pr-12 text-lg ${
                isDark
                  ? "border-white/10 bg-white/5 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-900"
              }`}
            />
            <Pressable
              onPress={() => setShowNewPassword((current) => !current)}
              className="absolute right-4 top-4"
              hitSlop={10}
            >
              <MaterialCommunityIcons
                name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={isDark ? "#cbd5e1" : "#475569"}
              />
            </Pressable>
          </View>
          <Text
            className={`mt-2 text-xs leading-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            Password must be at least 6 characters with 1 capital letter and 1
            symbol.
          </Text>
          {showErrors && !isValidNewPassword ? (
            <Text className="mt-2 text-sm text-red-400">
              Password must include one capital letter, one symbol, and be at
              least 6 letters.
            </Text>
          ) : null}
        </View>

        <View>
          <Text
            className={`mb-2 text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}
          >
            Confirm Password
          </Text>
          <View className="relative">
            <TextInput
              placeholder="Confirm new password"
              placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className={`rounded-2xl border px-4 py-4 pr-12 text-lg ${
                isDark
                  ? "border-white/10 bg-white/5 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-900"
              }`}
            />
            <Pressable
              onPress={() => setShowConfirmPassword((current) => !current)}
              className="absolute right-4 top-4"
              hitSlop={10}
            >
              <MaterialCommunityIcons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={isDark ? "#cbd5e1" : "#475569"}
              />
            </Pressable>
          </View>
        </View>

        {showErrors && isValidNewPassword && !passwordsMatch ? (
          <Text className="text-sm text-red-400">Passwords do not match.</Text>
        ) : null}
      </View>

      <Pressable
        onPress={handleContinue}
        className="mt-6 rounded-2xl bg-emerald-500 px-4 py-4 shadow-lg shadow-emerald-500/30 active:opacity-90"
      >
        <Text className="text-center text-base font-semibold text-white">
          Save New Password
        </Text>
      </Pressable>
    </View>
  );
};

export default Step3;
