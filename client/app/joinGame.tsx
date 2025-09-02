import { PaperProvider, TextInput, Button } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import { useRouter } from "expo-router"; // ✅ correct way
import io from "socket.io-client";
import { useEffect, useState } from "react";

// Connect once
const socket = io("http://localhost:3001", {
  reconnectionAttempts: 3,
  timeout: 5000,
});

const JoinGame = () => {
  const router = useRouter(); // ✅ useRouter hook
  const [roomCode, setRoomCode] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const joinRoom = () => {
    setError(null);
    if (!roomCode.trim()) {
      setError("Please enter a room code.");
      return;
    }

    socket.emit("join_room", { roomCode: roomCode.trim() });
  };

  useEffect(() => {
    const handleSuccess = () => {
      setJoined(true);
      setError(null);
      router.push("/gameboard"); // ✅ navigate after join
    };

    const handleError = ({ error }: { error: string }) => {
      setError(error || "Failed to join the game.");
    };

    socket.on("join_success", handleSuccess);
    socket.on("join_error", handleError);

    return () => {
      socket.off("join_success", handleSuccess);
      socket.off("join_error", handleError);
    };
  }, [router]);

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.header}>Join a Game</Text>

        <TextInput
          label='Room Code'
          value={roomCode}
          onChangeText={setRoomCode}
          style={styles.input}
        />

        <Button mode='contained' onPress={joinRoom} style={styles.button}>
          Join Game
        </Button>

        {joined && (
          <Text style={styles.success}>Successfully joined the room!</Text>
        )}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </PaperProvider>
  );
};

export default JoinGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 48,
    fontWeight: "bold",
    color: theme.colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    backgroundColor: "white",
  },
  button: {
    marginTop: 20,
    padding: 8,
  },
  success: {
    color: "green",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
