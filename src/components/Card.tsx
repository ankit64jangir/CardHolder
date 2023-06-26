import { Dimensions, Text } from "react-native";
import React, { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Box } from "../theme";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
const colors = ["#2B5150", "#2E898A", "#159D9F"];
const { height } = Dimensions.get("window");

type CardTypes = {
  card: IBankCard;
  index: number;
  expand: Animated.SharedValue<number>;
};

export const ITEM_HEIGHT = height / 13.5;

const Card = ({ card, expand, index }: CardTypes) => {
  const itemContainerAStyle = useAnimatedStyle(() => {
    // const initialSpace = (index + 1) * 50;
    // const expandedSpace = index * ITEM_HEIGHT;
    // const extraSpace = initialSpace / (index + 1) + index * 10;

    const initialSpace = (index + 1) * 50;
    const expandedSpace = (index * height) / 4;
    const extraSpace = initialSpace / (index + 1) + index * 10;

    const translateY =
      expand.value === 1 ? expandedSpace + extraSpace : initialSpace;
    return {
      width: "100%",
      position: "absolute",
      top: 80,
      // zIndex: 12 - index,
      transform: [
        {
          translateY: withSpring(translateY, {
            mass: 0.5,
          }),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          // height: height / 4,
        },
        itemContainerAStyle,
      ]}
    >
      <LinearGradient
        style={{
          height: height / 4,
          borderRadius: 12,
          paddingHorizontal: 10,
          paddingVertical: 20,
          justifyContent: "space-between",
        }}
        start={{ x: 0.1, y: 0 }}
        colors={colors}
      >
        <Box flexDirection="row" justifyContent="space-between">
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
              color: "white",
              textAlignVertical: "center",
            }}
          >
            Credit
          </Text>
        </Box>
        <Box>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
              color: "white",
              textAlignVertical: "center",
            }}
          >
            {card.name}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
              color: "white",
              textAlignVertical: "center",
            }}
          >
            {card.card_number}
          </Text>
        </Box>
      </LinearGradient>
    </Animated.View>
  );
};

export default memo(Card);
