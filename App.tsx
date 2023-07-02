import { ThemeProvider } from "@shopify/restyle";
import { useColorScheme } from "react-native";
import theme from "./src/theme";
import { darkTheme } from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigation/AppNavigation";
import { enableFreeze } from "react-native-screens";
import { initializeCardsStore } from "./src/stores/useCardsStore";

enableFreeze(true);
initializeCardsStore();

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
