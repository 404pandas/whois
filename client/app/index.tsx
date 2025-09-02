import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import { PaperProvider } from "react-native-paper";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.header}>Who Is...?</Text>
        <Text style={styles.button} onPress={() => router.push("/createGame")}>
          Create Game
        </Text>
        <Text
          style={styles.button}
          onPress={() => {
            router.push("/joinGame");
          }}
        >
          Join Game
        </Text>
      </View>
    </PaperProvider>
  );
}

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
