import { registerApi } from "@ecowat/shared";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import Verification from "./Verification";

interface Step1Props {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isValidEmail: boolean;
  isValidPassword: boolean;
  showErrors: boolean;
  triggerShowErrors: () => void;
  isDark: boolean;
  isValidUsername: boolean;
  name: string;
  setName: (name: string) => void;
}

const Step1 = (props: Step1Props) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    email,
    setEmail,
    password,
    name,
    setName,
    setPassword,
    isValidEmail,
    isValidPassword,
    showErrors,
    triggerShowErrors,
    isDark,
    isValidUsername,
  } = props;

  const handleSubmit = async () => {
    triggerShowErrors();
    if (!isValidEmail || !isValidUsername || !isValidPassword) {
      ToastAndroid.show("Invalid Fields", ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    try {
      const res = await registerApi(
        email,
        password,
        name,
        process.env.EXPO_PUBLIC_BASE_URL!,
      );
      const data = await res.json();
      if (!res.ok) {
        ToastAndroid.show(
          data.code || "Registration failed",
          ToastAndroid.SHORT,
        );
        return;
      }

      // Verification email sent, open popup
      setModalVisible(true);
    } catch (error: any) {
      console.log(error);
      ToastAndroid.show(
        error.code || error.message || "SOMETHING_WRONG",
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <Verification
        email={email}
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        isDark={isDark}
      />

      <Text
        className={`mb-2 text-lg font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}
      >
        Name
      </Text>
<View className="relative">
  <TextInput
    placeholder="Username"
    placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
    value={name}
    onChangeText={setName}
    className={`rounded-2xl border px-4 py-3 text-lg ${
      isDark
        ? "border-white/10 bg-white/5 text-white"
        : "border-slate-200 bg-slate-50 text-slate-900"
    }`}
  />
</View>

{showErrors && !isValidUsername ? (
  <Text className="mt-2 text-sm text-red-400">
    Please enter a valid username.
  </Text>
) : null}

      <Text
        className={`mb-2 text-lg font-medium mt-3 ${isDark ? "text-slate-200" : "text-slate-700"}`}
      >
        Email
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className={`mb-3 rounded-2xl border px-4 py-3 text-base ${
          isDark
            ? "border-white/10 bg-white/5 text-white"
            : "border-slate-200 bg-slate-50 text-slate-900"
        }`}
      />
      {showErrors && !isValidEmail ? (
        <Text className="mb-2 text-sm text-red-400">
          Please enter a valid email id.
        </Text>
      ) : null}

      <Text
        className={`mb-2 text-lg font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}
      >
        Password
      </Text>
      <View className="relative">
        <TextInput
          placeholder="Password"
          placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          className={`rounded-2xl border px-4 py-3 pr-12 text-lg ${
            isDark
              ? "border-white/10 bg-white/5 text-white"
              : "border-slate-200 bg-slate-50 text-slate-900"
          }`}
        />
        <Pressable
          onPress={() => setShowPassword((current) => !current)}
          className="absolute right-4 top-3.5"
          hitSlop={10}
        >
          <MaterialCommunityIcons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color={isDark ? "#cbd5e1" : "#475569"}
          />
        </Pressable>
      </View>
      <Text
        className={`mt-2 text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
      >
        Min 5 chars, 1 capital, 1 symbol.
      </Text>
      {showErrors && !isValidPassword ? (
        <Text className="mt-2 text-sm text-red-400">
          Password must be at least 5 chars, include 1 capital and 1 symbol.
        </Text>
      ) : null}

      <Pressable
        disabled={loading}
        onPress={handleSubmit}
        className={`mt-6 rounded-2xl px-4 py-3  ${loading ? "bg-gray-400 opacity-35" : "bg-emerald-500"}`}
      >
        <View className="items-center">
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-lg font-semibold text-white">Verify</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default Step1;
