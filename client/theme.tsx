// theme.tsx
import {
  MD3LightTheme as DefaultTheme,
  configureFonts,
  MD3Theme,
} from "react-native-paper";

const fontConfig = configureFonts({ config: DefaultTheme.fonts });

const customColors = {
  yellow: "#F2EA72",
  olive: "#A6A486",
  orange: "#F2AC57",
  rust: "#BF5B04",
  beige: "#D9CCC1",
  white: "#FFFFFF",
  black: "#1A1A1A",
  gray: "#666666",
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: customColors.yellow,
    secondary: customColors.olive,
    accent: customColors.orange,
    warning: customColors.rust,
    background: customColors.beige,
    surface: customColors.white,
    text: customColors.black,
    muted: customColors.gray,
  },
  roundness: 8,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fonts: fontConfig,

  shadow: {
    light: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4.65,
      elevation: 6,
    },
  },
};

export type ThemeType = typeof theme;
export default theme;
