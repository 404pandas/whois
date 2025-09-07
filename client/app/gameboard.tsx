import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  Text,
  ProgressBar,
  Surface,
  IconButton,
  Button,
} from "react-native-paper";
import theme from "@/theme";
import { router } from "expo-router";
import io from "socket.io-client";
import { useQuestionCycler } from "../components/QuestionsCycler";

const TOTAL_TIME = 15;
const socket = io("http://localhost:3001"); // make sure your socket import is here

const Gameboard = () => {
  const [playerAPick, setPlayerAPick] = useState<string | null>(null);
  const [playerBPick, setPlayerBPick] = useState<string | null>(null);
  const [players, setPlayers] = useState<string[]>([]); // track joined players
  const { currentQuestion, timeLeft, nextQuestion } = useQuestionCycler(
    15,
    (q) => console.log("New question:", q.text)
  );

  useEffect(() => {
    // Timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Socket listener
    socket.on("player_joined", ({ playerId }: { playerId: string }) => {
      setPlayers((prev) => {
        if (!prev.includes(playerId)) return [...prev, playerId];
        return prev;
      });
    });

    // Optionally, add yourself as first player
    setPlayers([socket.id]);

    return () => {
      clearInterval(interval);
      socket.off("player_joined");
    };
  }, []);

  const handlePick = (player: "Player A" | "Player B") => {
    if (players.length < 2) return; // disable picks until both players joined

    if (player === "Player A" && !playerAPick) setPlayerAPick("picked");
    if (player === "Player B" && !playerBPick) setPlayerBPick("picked");

    if (
      (playerAPick && playerBPick) ||
      (player === "Player A" && playerBPick) ||
      (player === "Player B" && playerAPick)
    ) {
      router.push("/(tabs)/results" as any);
    }
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.playersSection}>
        <TouchableOpacity
          style={[styles.playerHalf, { backgroundColor: theme.colors.primary }]}
          onPress={() => handlePick("Player A")}
          disabled={players.length < 2}
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
          disabled={players.length < 2}
        >
          <Text style={styles.playerText}>Player B</Text>
          <IconButton
            icon='arrow-right'
            size={36}
            iconColor={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <View>
        <Text>{currentQuestion?.text || "Loading question..."}</Text>
        <ProgressBar progress={timeLeft / 15} />
        <Button onPress={nextQuestion}>Skip</Button>
      </View>

      <Surface
        style={{ padding: 16, backgroundColor: theme.colors.background }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
          Time left: {timeLeft} seconds
        </Text>
        <IconButton
          icon='refresh'
          size={24}
          onPress={() => setTimeLeft(TOTAL_TIME)}
          iconColor={theme.colors.primary}
        />
      </Surface>

      <Surface
        style={{ padding: 16, backgroundColor: theme.colors.background }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
          {players.length < 2 ? "Waiting for another player..." : null}
        </Text>
      </Surface>
    </Surface>
  );
};

export default Gameboard;

const styles = StyleSheet.create({
  container: { flex: 1 },
  playersSection: { flex: 3, flexDirection: "row" },
  playerHalf: { flex: 1, justifyContent: "center", alignItems: "center" },
  playerText: { fontSize: 20, fontWeight: "bold", marginTop: 8 },
  questionSection: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  questionText: { fontSize: 18, textAlign: "center", marginBottom: 16 },
  progressBar: { height: 10, borderRadius: 5 },
});
