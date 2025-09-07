import { Surface, Text, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import theme from "@/theme";

export const RoomCodeSection = ({ roomCode }: { roomCode: string }) => {
  const copyRoomCode = () => {
    if (roomCode) {
      Clipboard.setString(roomCode);
      alert(`Room code ${roomCode} copied to clipboard!`);
    }
  };

  return (
    <Surface style={styles.container}>
      <Text style={styles.text}>Room Code: {roomCode}</Text>
      <Button mode='contained' onPress={copyRoomCode}>
        Copy
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  text: { fontSize: 20, fontWeight: "bold" },
});
