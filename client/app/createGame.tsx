import { PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";

import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001", {
  reconnectionAttempts: 3, // try reconnecting 3 times
  timeout: 5000, // 5 second timeout
});

const CreateGame = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // listen for errors
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
      setError("Could not connect to the game server. Please try again.");
    });

    socket.on("connect_timeout", () => {
      console.error("Socket connection timeout");
      setError("Connection to server timed out. Please check your network.");
    });

    return () => {
      socket.off("player_joined");
      socket.off("new_question");
      socket.off("connect_error");
      socket.off("connect_timeout");
    };
  }, []);

  const createRoom = () => {
    setError(null); // clear any existing error before creating a room
    socket.emit("create_room", (data: { roomCode: string }) => {
      if (data?.roomCode) {
        setRoomCode(data.roomCode);
      } else {
        setError("Failed to create a game room. Please try again.");
      }
    });
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.header}>Who Is...?</Text>

        <Text
          style={styles.button}
          onPress={() => {
            createRoom();
          }}
        >
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
