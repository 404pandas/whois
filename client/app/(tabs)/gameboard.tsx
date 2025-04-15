import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  Text,
  ProgressBar,
  useTheme,
  Surface,
  IconButton,
} from "react-native-paper";
import theme from "@/theme";

const TOTAL_TIME = 15;

const Gameboard = () => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePick = (player: "Player A" | "Player B") => {
    console.log(`${player} clicked`);
  };

  return (
    <Surface style={styles.container}>
      {/* Top 3/4 */}
      <View style={styles.playersSection}>
        <TouchableOpacity
          style={[styles.playerHalf, { backgroundColor: theme.colors.primary }]}
          onPress={() => handlePick("Player A")}
        >
          <IconButton
            icon='arrow-left'
            size={36}
            iconColor={theme.colors.text}
          />
          <Text style={styles.playerText}>Player A</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.playerHalf,
            { backgroundColor: theme.colors.secondary },
          ]}
          onPress={() => handlePick("Player B")}
        >
          <Text style={styles.playerText}>Player B</Text>
          <IconButton
            icon='arrow-right'
            size={36}
            iconColor={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom 1/4 */}
      <View style={styles.questionSection}>
        <Text style={styles.questionText}>
          Who is more likely to cry during a movie?
        </Text>
        <ProgressBar
          progress={timeLeft / TOTAL_TIME}
          color={theme.colors.accent}
          style={styles.progressBar}
        />
      </View>
    </Surface>
  );
};

export default Gameboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playersSection: {
    flex: 3,
    flexDirection: "row",
  },
  playerHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  questionSection: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  questionText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
});
