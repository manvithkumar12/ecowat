import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AppNavbarProps = {
  title?: string;
};

export default function AppNavbar({ title = "Ecowat" }: AppNavbarProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const backgroundColor = colorScheme === "dark" ? "#020617" : "#ffffff";
  const borderColor = colorScheme === "dark" ? "#1e293b" : "#e2e8f0";
  const textColor = colorScheme === "dark" ? "#f8fafc" : "#0f172a";
  const iconColor = colorScheme === "dark" ? "#e2e8f0" : "#0f172a";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderBottomColor: borderColor,
          paddingTop: insets.top,
          height: 64 + insets.top,
        },
      ]}
    >
      <View style={styles.brandRow}>
        <Image
          source={require("../assets/ecowat-icon.png")}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          hitSlop={10}
          style={styles.iconButton}
          onPress={() => router.push("/login")}
        >
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={26}
            color={iconColor}
          />
        </Pressable>
        <Pressable
          onPress={() => router.push("/Notifications")}
          hitSlop={10}
          style={styles.iconButton}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={26}
            color={iconColor}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
});
