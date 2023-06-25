import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { Text, useColorScheme } from "react-native";
import { Box } from "./src/theme";
import theme from "./src/theme";
import { darkTheme } from "./src/theme/theme";

export default function App() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider theme={scheme === "dark" ? darkTheme : theme}>
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        bg="mainBackground"
      >
        <Text
          style={{
            fontSize: 30,
          }}
          // color="lightGray"
        >
          🫣jkjknmn
        </Text>
        <StatusBar style="auto" />
      </Box>
    </ThemeProvider>
  );
}
