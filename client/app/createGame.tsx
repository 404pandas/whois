import { PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";

import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001"); // replace with your server URL

const CreateGame = () => {
  const [roomCode, setRoomCode] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("player_joined", ({ playerId }) => {
      setMessages((prev) => [...prev, `Player joined: ${playerId}`]);
    });

    socket.on("new_question", ({ question }) => {
      setMessages((prev) => [...prev, `Question: ${question}`]);
    });

    return () => {
      socket.off("player_joined");
      socket.off("new_question");
    };
  }, []);

  const createRoom = () => {
    console.log(`Room created`);
    socket.emit("create_room", ({ roomCode }) => {
      setRoomCode(roomCode);
      setMessages((prev) => [...prev, `Room created: ${roomCode}`]);
    });
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.header}>Who Is...?</Text>
        {/* socket.io form */}
        {/* on submit navigate to gameboard */}

        <Text
          style={styles.button}
          onPress={() => {
            createRoom();
          }}
        >
          Create Game
        </Text>
        {roomCode ? <Text>Your Room Code: {roomCode}</Text> : null}
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
});
