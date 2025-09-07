import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Clipboard } from "react-native";
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
import { useAppSelector } from "./hooks/index";

const TOTAL_TIME = 15;
const socket = io("http://localhost:3001"); // your socket connection

const Gameboard = () => {
  const roomCode = useAppSelector((state) => state.room.roomCode);
  const [playerAPick, setPlayerAPick] = useState<string | null>(null);
  const [playerBPick, setPlayerBPick] = useState<string | null>(null);
  const [players, setPlayers] = useState<string[]>([]);

  const { currentQuestion, timeLeft, setTimeLeft, nextQuestion } =
    useQuestionCycler(TOTAL_TIME, (q) => console.log("New question:", q.text));

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

    // Listen for new players joining
    socket.on("player_joined", ({ playerId }: { playerId: string }) => {
      setPlayers((prev) =>
        !prev.includes(playerId) ? [...prev, playerId] : prev
      );
    });

    // Add self as first player
    setPlayers([socket.id]);

    return () => {
      clearInterval(interval);
      socket.off("player_joined");
    };
  }, []);

  const handlePick = (player: "Player A" | "Player B") => {
    if (players.length < 2) return; // disable until both players joined

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

  const copyRoomCode = () => {
    if (roomCode) {
      Clipboard.setString(roomCode);
      alert(`Room code ${roomCode} copied to clipboard!`);
    }
  };

  return (
    <Surface style={styles.container}>
      {roomCode && (
        <Surface style={styles.roomCodeSection}>
          <Text style={styles.roomCodeText}>Room Code: {roomCode}</Text>
          <Button mode='contained' onPress={copyRoomCode}>
            Copy
          </Button>
        </Surface>
      )}

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

      <View style={styles.questionSection}>
        <Text style={styles.questionText}>
          {currentQuestion?.text || "Loading question..."}
        </Text>
        <ProgressBar
          progress={timeLeft / TOTAL_TIME}
          style={styles.progressBar}
        />
        <Button onPress={nextQuestion}>Skip</Button>
      </View>

      <Surface style={styles.timeSection}>
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

      <Surface style={styles.waitingSection}>
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
  roomCodeSection: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  roomCodeText: { fontSize: 20, fontWeight: "bold" },
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
  timeSection: { padding: 16, backgroundColor: theme.colors.background },
  waitingSection: { padding: 16, backgroundColor: theme.colors.background },
});
