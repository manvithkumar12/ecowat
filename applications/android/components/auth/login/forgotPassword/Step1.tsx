import { View, Text, TextInput, Pressable } from "react-native";

interface Step1Props {
  email: string;
  setEmail: (email: string) => void;
  isValidEmail: boolean;
  showErrors: boolean;
  handleContinue: () => void;
  isDark: boolean;
}

const Step1 = ({
  email,
  setEmail,
  isValidEmail,
  showErrors,
  handleContinue,
  isDark,
}: Step1Props) => {
  return (
    <View>
      <Text
        className={`text-3xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
      >
        Forgot Password
      </Text>
      <Text
        className={`mt-2 text-base ${isDark ? "text-slate-300" : "text-slate-600"}`}
      >
        Enter your email address to receive a verification code.
      </Text>

      <View className="mt-6">
        <Text
          className={`mb-2 text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}
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

      <Pressable
        onPress={handleContinue}
        className="mt-6 rounded-2xl bg-emerald-500 px-4 py-4 shadow-lg shadow-emerald-500/30 active:opacity-90"
      >
        <Text className="text-center text-base font-semibold text-white">
          Verify Email
        </Text>
      </Pressable>
    </View>
  );
};

export default Step1;
