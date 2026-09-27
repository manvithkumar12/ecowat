import { ActivityIndicator, StatusBar, View } from "react-native";
import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "../context/Userprovider";
import { getUser } from "../utils/user/getUser";
import { useEffect, useState } from "react";
import { loggedUser } from "@ecowat/shared";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [user, setUser] = useState<loggedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      setLoading(false);
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <UserProvider user={user}>
        <QueryClientProvider client={queryClient}>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
