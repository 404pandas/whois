import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import theme from "@/theme";

export const WaitingSection = ({ players }: { players: string[] }) => (
  <Surface style={styles.container}>
    <Text style={{ color: theme.colors.text, fontSize: 16 }}>
      {players.length < 2 ? "Waiting for another player..." : null}
    </Text>
  </Surface>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: theme.colors.background },
});
