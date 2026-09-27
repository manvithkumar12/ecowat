import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import ForgotPassword from "../../components/auth/login/forgotPassword/ForgotPassword";
import { loginAPi } from "@ecowat/shared";

export default function LoginPage() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isDark = colorScheme === "dark";
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.trim().length >= 6;
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!isValidEmail || !isValidPassword) {
      ToastAndroid.show("Enter Valid Email and Password", ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    try {
      const res = await loginAPi(
        email,
        password,
        process.env.EXPO_PUBLIC_BASE_URL,
      );
      const data = await res.json();
      if (!res.ok) {
        ToastAndroid.show(data.code, ToastAndroid.SHORT);
        return;
      }
      await SecureStore.setItemAsync("token", data.token);

      router.replace("/");
    } catch (error: any) {
      ToastAndroid.show(
        error.code || error.message || "SOMETHING_WRONG",
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <ForgotPassword
        onBack={() => setShowForgotPassword(false)}
        onDone={() => setShowForgotPassword(false)}
      />
    );
  }
  return (
    <ScrollView
      className={isDark ? "flex-1 bg-slate-950" : "flex-1 bg-slate-50"}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-5 py-10">
        <View
          className={`overflow-hidden rounded-[32px] border shadow-2xl ${
            isDark
              ? "border-emerald-500/20 bg-slate-900 shadow-emerald-950/30"
              : "border-emerald-100 bg-white shadow-slate-200/70"
          }`}
        >
          <View
            className={`absolute left-[-24px] top-[-24px] h-32 w-32 rounded-full ${
              isDark ? "bg-emerald-500/20" : "bg-emerald-200/50"
            }`}
          />
          <View
            className={`absolute bottom-[-28px] right-[-24px] h-40 w-40 rounded-full ${
              isDark ? "bg-cyan-500/10" : "bg-cyan-200/40"
            }`}
          />

          <View className="px-6 pb-8 pt-10">
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
                className={`text-3xl font-semibold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Welcome to Ecowatt
              </Text>
              <Text
                className={`mt-2 text-center text-base ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Sign in to track your energy usage and footprint insights.
              </Text>
            </View>

            <View className="gap-4">
              <View>
                <Text
                  className={`mb-2 text-sm font-medium ${
                    isDark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Email
                </Text>
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  className={`rounded-2xl border px-4 py-4 text-base ${
                    isDark
                      ? "border-white/10 bg-white/5 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-900"
                  }`}
                />
                {showErrors && !isValidEmail ? (
                  <Text className="mt-2 text-sm text-red-400">
                    Please enter a valid email id.
                  </Text>
                ) : null}
              </View>

              <View>
                <Text
                  className={`mb-2 text-sm font-medium ${
                    isDark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Password
                </Text>
                <View className="relative">
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    className={`rounded-2xl border px-4 py-4 pr-12 text-lg ${
                      isDark
                        ? "border-white/10 bg-white/5 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-900"
                    }`}
                  />
                  <Pressable
                    onPress={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-4"
                    hitSlop={10}
                  >
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color={isDark ? "#cbd5e1" : "#475569"}
                    />
                  </Pressable>
                </View>
                {showErrors && !isValidPassword ? (
                  <Text className="mt-2 text-sm text-red-400">
                    Password is wrong.
                  </Text>
                ) : null}
              </View>

              <View className="flex-row items-center justify-between">
                <Pressable onPress={() => setShowForgotPassword(true)}>
                  <Text className="text-sm font-medium text-emerald-500 dark:text-emerald-400">
                    Forgot password?
                  </Text>
                </Pressable>
                <View className="rounded-full bg-emerald-500/10 px-3 py-1 dark:bg-emerald-500/10">
                  <Text className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                    Secure Login
                  </Text>
                </View>
              </View>

              <Pressable
                className={`mt-6 rounded-2xl px-4 py-3  ${loading ? "bg-gray-400 opacity-35" : "bg-emerald-500"}`}
                disabled={loading}
                onPress={() => {
                  setShowErrors(true);
                  handleLogin();
                }}
              >
                <View className="items-center">
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text className="text-lg font-semibold text-white">
                      Login
                    </Text>
                  )}
                </View>
              </Pressable>
              <View className="mt-4 flex-row items-center justify-center">
                <Pressable
                  onPress={() => router.push("/Register")}
                  className={`rounded-full border px-4 py-2 ${
                    isDark ? "border-white/10" : "border-slate-200"
                  }`}
                >
                  <Text className="text-lg font-semibold text-emerald-500 dark:text-emerald-300">
                    Register here
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
