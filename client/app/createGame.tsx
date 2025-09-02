import { PaperProvider } from "react-native-paper";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";
import { useCreateRoomMutation } from "./services/roomApi";
import { useRouter } from "expo-router";

const CreateGame = () => {
  const router = useRouter(); // ✅ useRouter instead of useNavigation
  const [createRoom, { data, isLoading, isError }] = useCreateRoomMutation();

  const handleCreateRoom = async () => {
    try {
      await createRoom().unwrap();
    } catch (err) {
      console.error("Failed to create room:", err);
    }
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

        {isError && <Text style={styles.error}>Failed to create room</Text>}

        {data?.roomCode && (
          <>
            <Text>Your Room Code: {data.roomCode}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/gameboard")} // ✅ fixed
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
});
