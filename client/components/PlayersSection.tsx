import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import theme from "@/theme";

interface PlayersSectionProps {
  players: string[];
  handlePick: (player: "Player A" | "Player B") => void;
}

export const PlayersSection = ({
  players,
  handlePick,
}: PlayersSectionProps) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.playerHalf, { backgroundColor: theme.colors.primary }]}
      onPress={() => handlePick("Player A")}
      disabled={players.length < 2}
    >
      <IconButton icon='arrow-left' size={36} iconColor={theme.colors.text} />
      <Text style={styles.playerText}>Player A</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.playerHalf, { backgroundColor: theme.colors.secondary }]}
      onPress={() => handlePick("Player B")}
      disabled={players.length < 2}
    >
      <Text style={styles.playerText}>Player B</Text>
      <IconButton icon='arrow-right' size={36} iconColor={theme.colors.text} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 3, flexDirection: "row" },
  playerHalf: { flex: 1, justifyContent: "center", alignItems: "center" },
  playerText: { fontSize: 20, fontWeight: "bold", marginTop: 8 },
});
