import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  Linking,
  ToastAndroid,
} from "react-native";

interface VerificationProps {
  email: string;
  open: boolean;
  onClose: () => void;
  isDark: boolean;
}

const Verification = ({ email, open, onClose, isDark }: VerificationProps) => {
  const openGmail = async () => {
    try {
      const supported = await Linking.canOpenURL("googlegmail://co?to=");

      if (supported) {
        await Linking.openURL("googlegmail://");
        return;
      }

      await Linking.openURL("https://mail.google.com");
    } catch {
      ToastAndroid.show("Unable to open Gmail", ToastAndroid.SHORT);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/60 px-5">
        <View
          className={`w-full max-w-sm rounded-[28px] border p-6 shadow-xl items-center ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-100"
          }`}
        >
          <View
            className={`mb-4 p-4 rounded-full ${
              isDark ? "bg-emerald-500/10" : "bg-emerald-50"
            }`}
          >
            <MaterialCommunityIcons
              name="email-check-outline"
              size={48}
              color={isDark ? "#34d399" : "#059669"}
            />
          </View>

          <Text
            className={`text-xl font-bold text-center mb-2 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Check your email
          </Text>

          <Text
            className={`text-sm text-center mb-6 leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            We've sent a verification link to{"\n"}
            <Text className="font-semibold text-emerald-500">{email}</Text>.
            {"\n"}
            Please click the link in the email to verify your account.
          </Text>

          <View className="w-full flex-col gap-3">
            <Pressable
              onPress={openGmail}
              className="w-full rounded-2xl bg-emerald-500 py-3.5 items-center justify-center shadow-lg shadow-emerald-500/20 active:opacity-90"
            >
              <Text className="text-base font-bold text-white">Open Gmail</Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              className={`w-full rounded-2xl py-3.5 items-center justify-center border ${
                isDark
                  ? "border-slate-800 bg-slate-850 active:bg-slate-800"
                  : "border-slate-200 bg-slate-50 active:bg-slate-100"
              }`}
            >
              <Text
                className={`text-base font-semibold ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Verification;
