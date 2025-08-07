import { StyleSheet, TouchableOpacity } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { router } from "expo-router";

export const Header = () => {
  const theme = useTheme();

  return (
    <Surface
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TouchableOpacity onPress={() => router.push("/(tabs)/gameboard" as any)}>
        <Text style={[styles.link, { color: theme.colors.primary }]}>
          Go to Game
        </Text>
      </TouchableOpacity>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
