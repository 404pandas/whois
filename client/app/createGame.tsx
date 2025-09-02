import { PaperProvider } from "react-native-paper";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import io from "socket.io-client";
import theme from "../theme";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

// Connect to your Socket.IO server
const socket = io("http://localhost:3001"); // <-- change to your server URL if needed

const CreateGame = () => {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateRoom = () => {
    setIsLoading(true);
    setError(null);

    socket.emit("create_room");

    socket.once("room_created", ({ roomCode }) => {
      setRoomCode(roomCode);
      setIsLoading(false);
    });

    // Optional: handle errors if server emits an error
    socket.once("error", (err) => {
      setError("Failed to create room");
      setIsLoading(false);
      console.error(err);
    });
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.header}>Who Is...?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateRoom}
          disabled={isLoading}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            {isLoading ? "Creating..." : "Create Game"}
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}

        {roomCode && (
          <>
            <Text style={styles.roomCode}>Your Room Code: {roomCode}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/gameboard")}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Go to Gameboard
              </Text>
            </TouchableOpacity>
          </>
        )}
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
    padding: 20,
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
    marginVertical: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  roomCode: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});
