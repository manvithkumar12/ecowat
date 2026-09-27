import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import AppNavbar from "../../components/AppNavbar";

export default function TabLayout() {
  return (
    <>
      <AppNavbar title="Ecowat" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
