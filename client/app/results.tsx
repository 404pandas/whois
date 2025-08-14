import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Surface } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import theme from "@/theme";

const Results = () => {
  const params = useLocalSearchParams();
  const playerA = (params.playerA as string) || "No pick";
  const playerB = (params.playerB as string) || "No pick";

  return (
    <Surface style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Results</Text>
        <View style={styles.resultSection}>
          <Text style={styles.label}>Player A selected:</Text>
          <Text style={styles.value}>{playerA}</Text>
        </View>
        <View style={styles.resultSection}>
          <Text style={styles.label}>Player B selected:</Text>
          <Text style={styles.value}>{playerB}</Text>
        </View>
      </View>
    </Surface>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: theme.colors.text,
  },
  resultSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: theme.colors.text,
  },
  value: {
    fontSize: 18,
    color: theme.colors.primary,
  },
});
