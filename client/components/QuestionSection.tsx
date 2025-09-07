import { View, StyleSheet } from "react-native";
import { Text, ProgressBar, Button } from "react-native-paper";

export const QuestionSection = ({
  currentQuestion,
  timeLeft,
  totalTime,
  nextQuestion,
}: {
  currentQuestion?: { question: string };
  timeLeft: number;
  totalTime: number;
  nextQuestion: () => void;
}) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {currentQuestion?.question || "Loading question..."}
    </Text>
    <ProgressBar progress={timeLeft / totalTime} style={styles.progressBar} />
    <Button onPress={nextQuestion}>Skip</Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: { fontSize: 18, textAlign: "center", marginBottom: 16 },
  progressBar: { height: 10, borderRadius: 5 },
});
