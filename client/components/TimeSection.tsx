import { StyleSheet } from "react-native";
import { Surface, Text, IconButton } from "react-native-paper";
import theme from "@/theme";

export const TimeSection = ({
  timeLeft,
  resetTime,
}: {
  timeLeft: number;
  resetTime: () => void;
}) => (
  <Surface style={styles.container}>
    <Text style={{ color: theme.colors.text, fontSize: 16 }}>
      Time left: {timeLeft} seconds
    </Text>
    <IconButton
      icon='refresh'
      size={24}
      onPress={resetTime}
      iconColor={theme.colors.primary}
    />
  </Surface>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: theme.colors.background },
});
