import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import { router } from "expo-router";
import io from "socket.io-client";
import { useQuestionCycler } from "../components/QuestionsCycler";
import { useAppSelector } from "./hooks/index";

import { RoomCodeSection } from "../components/RoomCodeSection";
import { PlayersSection } from "../components/PlayersSection";
import { QuestionSection } from "../components/QuestionSection";
import { TimeSection } from "../components/TimeSection";
import { WaitingSection } from "../components/WaitingSection";

const TOTAL_TIME = 15;
const socket = io("http://localhost:3001");

const Gameboard = () => {
  const roomCode = useAppSelector((state) => state.room.roomCode);
  const [playerAPick, setPlayerAPick] = useState<string | null>(null);
  const [playerBPick, setPlayerBPick] = useState<string | null>(null);
  const [players, setPlayers] = useState<string[]>([]);

  const { currentQuestion, timeLeft, setTimeLeft, nextQuestion } =
    useQuestionCycler(TOTAL_TIME, (q) =>
      console.log("New question:", q.question)
    );

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

    socket.on("player_joined", ({ playerId }: { playerId: string }) => {
      setPlayers((prev) =>
        !prev.includes(playerId) ? [...prev, playerId] : prev
      );
    });

    setPlayers([socket.id]);

    return () => {
      clearInterval(interval);
      socket.off("player_joined");
    };
  }, []);

  const handlePick = (player: "Player A" | "Player B") => {
    if (players.length < 2) return;

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
      {roomCode && <RoomCodeSection roomCode={roomCode} />}
      <PlayersSection players={players} handlePick={handlePick} />
      <QuestionSection
        currentQuestion={currentQuestion}
        timeLeft={timeLeft}
        totalTime={TOTAL_TIME}
        nextQuestion={nextQuestion}
      />
      <TimeSection
        timeLeft={timeLeft}
        resetTime={() => setTimeLeft(TOTAL_TIME)}
      />
      <WaitingSection players={players} />
    </Surface>
  );
};

export default Gameboard;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
