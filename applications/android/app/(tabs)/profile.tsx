import { Text, View, useColorScheme } from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#020617" : "#ffffff";
  const titleColor = colorScheme === "dark" ? "#f8fafc" : "#0f172a";

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
      }}
    >
      <Text style={{ color: titleColor, fontSize: 24, fontWeight: "700" }}>
        Profile
      </Text>
    </View>
  );
}
