import React, { useState } from "react";
import { ScrollView, View, useColorScheme } from "react-native";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import MiniNav from "./MiniNav";
import { StepBar } from "./StepBar";

type ForgotPasswordProps = {
  onBack: () => void;
  onDone?: () => void;
};

const CORRECT_OTP = "123456";

export default function ForgotPassword({
  onBack,
  onDone,
}: ForgotPasswordProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidOtp = otp.trim().length === 6 && otp === CORRECT_OTP;
  const passwordHasUppercase = /[A-Z]/.test(newPassword);
  const passwordHasSymbol = /[^A-Za-z0-9]/.test(newPassword);
  const passwordHasMinLength = newPassword.trim().length >= 6;
  const isValidNewPassword =
    passwordHasMinLength && passwordHasUppercase && passwordHasSymbol;
  const passwordsMatch = isValidNewPassword && newPassword === confirmPassword;

  const handleContinue = () => {
    setShowErrors(true);

    if (step === 1 && isValidEmail) {
      setStep(2);
      setShowErrors(false);
      return;
    }

    if (step === 2 && isValidOtp) {
      setStep(3);
      setShowErrors(false);
      return;
    }

    if (step === 3 && passwordsMatch) {
      onDone?.();
      onBack();
    }
  };

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

          <View className="px-6 pb-8 pt-8">
            <MiniNav onBack={onBack} />
            <StepBar step={step} isDark={isDark} />

            {step === 1 ? (
              <Step1
                email={email}
                setEmail={setEmail}
                isValidEmail={isValidEmail}
                showErrors={showErrors}
                handleContinue={handleContinue}
                isDark={isDark}
              />
            ) : null}

            {step === 2 ? (
              <Step2
                email={email}
                otp={otp}
                setOtp={setOtp}
                isValidOtp={isValidOtp}
                showErrors={showErrors}
                handleContinue={handleContinue}
                isDark={isDark}
              />
            ) : null}

            {step === 3 ? (
              <Step3
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                isValidNewPassword={isValidNewPassword}
                passwordsMatch={passwordsMatch}
                showErrors={showErrors}
                handleContinue={handleContinue}
                isDark={isDark}
              />
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
