import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { Text, useColorScheme } from "react-native";
import { Box } from "./src/theme";
import theme from "./src/theme";
import { darkTheme } from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigation/AppNavigation";
import { enableFreeze } from "react-native-screens";

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer>
      <ThemeProvider theme={scheme === "dark" ? darkTheme : theme}>
        <AppNavigation />
      </ThemeProvider>
    </NavigationContainer>
  );
}
