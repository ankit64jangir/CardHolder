import { CompositeNavigationProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { memo } from "react";
import AddCardScreen from "../screens/AddCardScreen";
import HomeScreen from "../screens/HomeScreen";
import ViewCardScreen from "../screens/ViewCardScreen";

export type StackNavigatorParamList = {
  Home: undefined;
  AddCard: {
    card?: IBankCard;
  };
  ViewCard: {
    card: IBankCard;
  };
};

export type NavigationType<RouteName extends keyof StackNavigatorParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<StackNavigatorParamList, RouteName>,
    NativeStackNavigationProp<StackNavigatorParamList>
  >;

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          presentation: "containedModal",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="AddCard"
          component={AddCardScreen}
          options={{
            animation: "fade_from_bottom",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewCard"
          component={ViewCardScreen}
          options={{
            animation: "fade",
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default memo(AppNavigation);
