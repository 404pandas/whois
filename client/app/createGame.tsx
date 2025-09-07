import { PaperProvider } from "react-native-paper";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";
import { useRouter } from "expo-router";
import { useCreateRoomMutation } from "./services/roomApi";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const CreateGame = () => {
  const router = useRouter();

  const [createRoom, { isLoading, error }] = useCreateRoomMutation();
  const roomCode = useSelector((state: RootState) => state.room.roomCode);

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.header}>Who Is...?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => createRoom()}
          disabled={isLoading}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            {isLoading ? "Creating..." : "Create Game"}
          </Text>
        </TouchableOpacity>

        {error && (
          <Text style={styles.error}>Failed to create room. Try again.</Text>
        )}

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
