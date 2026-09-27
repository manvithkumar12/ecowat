import React, { useState } from "react";
import { Image, ScrollView, Text, View, useColorScheme } from "react-native";
import Step1 from "../../components/auth/register/Step1";

export default function Register() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasUpper = /[A-Z]/.test(password);
  const isValidUsername = name.trim().length >= 3;
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const hasMin = password.trim().length >= 5;
  const isValidPassword = hasUpper && hasSymbol && hasMin;

  const triggerShowErrors = () => {
    setShowErrors(true);
  };

  return (
    <ScrollView
      className={isDark ? "flex-1 bg-slate-950" : "flex-1 bg-slate-50"}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-5 py-10">
        <View
          className={`overflow-hidden rounded-[24px] border p-6 shadow-sm ${
            isDark
              ? "border-emerald-500/10 bg-slate-900"
              : "border-emerald-100 bg-white"
          }`}
        >
          <View className="px-6 pb-2 pt-6">
            <View className="mb-6 items-center">
              <View
                className={`mb-4 rounded-3xl border p-4 ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <Image
                  source={require("../../assets/ecowat-icon.png")}
                  style={{ width: 64, height: 64, borderRadius: 18 }}
                />
              </View>
              <Text
                className={`text-2xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
              >
                Create account
              </Text>
              <Text
                className={`mt-2 text-center text-base ${isDark ? "text-slate-300" : "text-slate-600"}`}
              >
                Create an account to track your energy usage and footprint
                insights.
              </Text>
            </View>
          </View>

          <Step1
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isValidEmail={isValidEmail}
            isValidPassword={isValidPassword}
            showErrors={showErrors}
            triggerShowErrors={triggerShowErrors}
            isDark={isDark}
            isValidUsername={isValidUsername}
            name={name}
            setName={setName}
          />
        </View>
      </View>
    </ScrollView>
  );
}
