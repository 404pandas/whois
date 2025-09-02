import { PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import { router } from "expo-router";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001", {
  reconnectionAttempts: 3,
  timeout: 5000,
});

const CreateGame = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Listen for room creation event
    socket.on("room_created", (data: { roomCode: string }) => {
      console.log("Room created with code:", data.roomCode);
      setRoomCode(data.roomCode);
      router.push("/gameboard"); // Redirect after room is created
    });

    // Listen for connection errors
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
      setError("Could not connect to the game server. Please try again.");
    });

    socket.on("connect_timeout", () => {
      console.error("Socket connection timeout");
      setError("Connection to server timed out. Please check your network.");
    });

    return () => {
      socket.off("room_created");
      socket.off("connect_error");
      socket.off("connect_timeout");
    };
  }, []);

  const createRoom = () => {
    setError(null); // clear existing errors
    socket.emit("create_room"); // emit event without callback
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.header}>Who Is...?</Text>

        <Text style={styles.button} onPress={createRoom}>
          Create Game
        </Text>

        {roomCode ? <Text>Your Room Code: {roomCode}</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    </PaperProvider>
  );
};

export default CreateGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    justifyContent: "center",
  },
  header: {
    fontSize: 60,
    fontWeight: "bold",
    color: theme.colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 8,
    textAlign: "center",
    margin: 20,
    overflow: "hidden",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
