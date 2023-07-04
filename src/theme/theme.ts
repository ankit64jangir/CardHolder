import { createTheme, RNStyle, useTheme as useReTheme } from "@shopify/restyle";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const palette = {
  purple: "#5A31F4",
  white: "#FFF",
  black: "#111",
  darkGray: "#333",
  lightGray: "#EEE",
};

const spacing = {
  hair: StyleSheet.hairlineWidth,
  px: 1,
  "0": 0,
  "0.5": 2,
  "1": 4,
  "1.5": 6,
  "2": 8,
  "2.5": 10,
  "3": 12,
  "3.5": 15,
  "4": 16,
  "5": 20,
  "6": 24,
  "7": 28,
  "8": 32,
  "9": 36,
  "10": 40,
  "11": 44,
  "12": 48,
  "14": 56,
  "16": 64,
  "20": 80,
  "24": 96,
  "28": 112,
  "32": 128,
  "36": 104,
  "40": 160,
  "44": 176,
  "48": 192,
  "52": 208,
  "56": 224,
  "60": 240,
  "64": 256,
  "72": 288,
  "80": 320,
  "96": 384,
  "-8": -32,
  "-10": -40,
};

const theme = createTheme({
  colors: {
    ...palette,
    mainBackground: palette.white,
    mainForeground: palette.black,
    primaryCardBackground: palette.purple,
    secondaryCardBackground: palette.white,
    primaryCardText: palette.white,
    secondaryCardText: palette.black,
    blue: "#1E63EA",
    modalBackdrop: "rgba(0, 0, 0, 0.25)",
    grayText: "#78716C",
  },
  textVariants: {
    defaults: {
      fontSize: 16,
    },
  },
  spacing,
});

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.black,
    primaryCardBackground: palette.purple,
    secondaryCardBackground: palette.white,
    primaryCardText: palette.white,
    secondaryCardText: palette.black,
    blue: "#1E63EA",
    modalBackdrop: "rgba(0, 0, 0, 0.25)",
    grayText: "#525252",
  },
};

export type Theme = typeof theme;
export default theme;

export const useTheme = () => useReTheme<Theme>();

// type NamedStyles<T> = { [P in keyof T]: RNStyle };
// export const mkUseStyles =
//   <T extends NamedStyles<T>>(styles: (globalTheme: Theme) => T) =>
//   () => {
//     const currentTheme = useTheme();
//     return useMemo(() => ({ ...styles(currentTheme) }), [currentTheme]);
//   };
