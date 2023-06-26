import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { memo, useEffect, useState } from "react";
import { Dimensions, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../components/Card";
import { Box, Text } from "../theme";

const { width, height } = Dimensions.get("window");

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const expanded = useSharedValue(0);

  const [cards, setCards] = useState<IBankCard[]>([]);
  useEffect(() => {
    const retrieveArray = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("cards");
        if (jsonValue !== null) {
          const parsedArray = JSON.parse(jsonValue);
          setCards(parsedArray);
        }
      } catch (error) {
        console.log("Error retrieving array:", error);
      }
    };
    retrieveArray();
  }, []);
  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(expanded.value === 0 ? width / 2.5 : 0),
        },
      ],
    };
  });

  const closeAnimatedBtn = useAnimatedStyle(() => {
    return {
      opacity: withTiming(expanded.value),
    };
  });

  const handleCardPress = () => {
    expanded.value = 1;
    if (expanded.value == 1) {
      //@ts-ignore
      navigation.navigate("AddCard");
    }
  };

  return (
    <Box flex={1}>
      <Box
        style={{ paddingTop: insets.top + 8 }}
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        bg="lightGray"
        px="4"
        pb="4"
      >
        <Animated.Text style={[titleStyle]}>Cards</Animated.Text>
        <AnimatedPressable
          onPress={() => (expanded.value = 0)}
          style={[closeAnimatedBtn]}
        >
          <Text>Close</Text>
        </AnimatedPressable>
      </Box>
      <Box mx="2">
        {cards?.map((card, index) => {
          return (
            <AnimatedPressable
              onPress={handleCardPress}
              key={index}
              style={{
                position: "absolute",
                width: "100%",
                top: -120,
              }}
            >
              <Card key={index} card={card} expand={expanded} index={index} />
            </AnimatedPressable>
          );
        })}
      </Box>
      {/* <TouchableOpacity
        onPress={() => {
          expanded.value = 1;
          // navigation.navigate("AddCard")
        }}
      >
        <Box>
          <Text>Add card</Text>
        </Box>
      </TouchableOpacity> */}
    </Box>
  );
};

export default memo(HomeScreen);
