import { useNavigation } from "@react-navigation/native";
import { memo, useEffect } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../components/Card";
import { Box, Text } from "../theme";

const { width, height } = Dimensions.get("window");

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const Cards = [1, 2, 3, 4];

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const expanded = useSharedValue(0);

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(expanded.value === 0 ? width / 2.5 : 0),
        },
      ],
    };
  });

  const handleCardPress = () => {
    expanded.value = 1;
    if (expanded.value == 1) {
      navigation.navigate("AddCard");
    }
  };

  const getAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const initialSpace = (index + 1) * 50;
      const expandedSpace = (index * height) / 4;
      const extraSpace = initialSpace / (index + 1) + index * 10;

      const translateY =
        expanded.value === 1 ? expandedSpace + extraSpace : initialSpace;

      return {
        transform: [
          {
            translateY: withSpring(translateY, {
              mass: 0.5,
            }),
          },
        ],
      };
    });
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
        <TouchableOpacity onPress={() => (expanded.value = 0)}>
          <Text>Close</Text>
        </TouchableOpacity>
      </Box>
      <Box mx="2" mt="-10" marginBottom="80">
        {Cards.map((card, index) => {
          const aStyle = getAnimatedStyle(index);
          return (
            <AnimatedPressable
              onPress={handleCardPress}
              key={index}
              style={[
                aStyle,
                {
                  position: "absolute",
                  width: "100%",
                  //   alignSelf: "center",
                },
              ]}
            >
              <Card />
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
