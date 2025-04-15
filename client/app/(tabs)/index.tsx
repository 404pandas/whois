import { StyleSheet, View } from "react-native";
import theme from "../../theme.jsx";
import { PaperProvider } from "react-native-paper";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Header />
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
});
