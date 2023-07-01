import { Image, StyleSheet } from "react-native";
import React, { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Box, Text } from "../theme";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { height } from "../utils/dimensions";
import { cardTypeIndex, CARD_TYPE_IMAGES } from "../utils/constants";
import { ChipIcon, WaveLeftIcon } from "../icons";
import { useTheme } from "../theme/theme";

const colors = ["#2B5150", "#2E898A", "#159D9F"];
const visa = ["#003399", "#0077FF", "#33AAFF", "#66CCFF"];
const mastercard = ["#FF4D4D", "#FF8C1A", "#FFCC00"];
const amex = ["#003399", "#730099", "#BD00FF"];
const discover = ["#FF7F00", "#FFC800", "#FFEB00"];
const dinersClub = ["#8C1B18", "#1C3788"];
const jcb = ["#003399", "#CC0000"];

type CardTypes = {
  card: IBankCard;
  index: number;
  expand: Animated.SharedValue<number>;
};

const Card = ({ card, expand, index }: CardTypes) => {
  const theme = useTheme();
  const getCardColor = () => {
    switch (card.card_type) {
      case "visa":
        return visa;
        break;
      case "mastercard":
        return mastercard;
        break;
      case "amex":
        return amex;
        break;
      case "dinersclub":
        return dinersClub;
        break;
      case "discover":
        return discover;
        break;
      case "jcb":
        return jcb;
        break;
      default:
        return colors;
        break;
    }
  };

  const itemContainerAStyle = useAnimatedStyle(() => {
    const initialSpace = (index + 1) * 50;
    const expandedSpace = (index * height) / 3.5;
    const extraSpace = initialSpace / (index + 1) + index * 10;

    const translateY =
      expand.value === 1 ? expandedSpace + extraSpace : initialSpace;
    return {
      width: "100%",
      position: "absolute",
      top: 80,
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
    <Animated.View style={[itemContainerAStyle]}>
      <LinearGradient
        style={{
          height: height / 3.5,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 20,
          justifyContent: "space-between",
        }}
        start={{ x: 0.1, y: 0 }}
        colors={getCardColor()}
      >
        <Box>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
              color: "white",
              textAlignVertical: "center",
            }}
          >
            BANK NAME
          </Text>
        </Box>

        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ChipIcon size={50} />
          <WaveLeftIcon size={24} color={theme.colors.white} />
        </Box>

        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text style={styles.cardNumber}>&bull;&bull;&bull;&bull;</Text>
          <Text style={styles.cardNumber}>&bull;&bull;&bull;&bull;</Text>
          <Text style={styles.cardNumber}>&bull;&bull;&bull;&bull;</Text>
          <Text style={styles.cardNumber}>
            {String(card.card_number).slice(-4)}
          </Text>
        </Box>

        <Box flexDirection="row" alignItems="center">
          <Text fontSize={8} color="white" textAlign="center">
            VALID{"\n"}THRU
          </Text>
          <Text style={styles.textStyle} ml="1">
            {card.validity}
          </Text>
        </Box>

        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            fontSize={20}
            fontWeight={"bold"}
            color="white"
            letterSpacing={2}
          >
            {card.name.toUpperCase()}
          </Text>
          {card.card_type !== "unknown" && (
            <Image
              source={
                card.card_type &&
                CARD_TYPE_IMAGES[cardTypeIndex[card.card_type]]
              }
              resizeMode="contain"
              style={{
                height: 50,
                width: 50,
              }}
            />
          )}
        </Box>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardNumber: {
    fontSize: 22,
    fontWeight: "400",
    color: "white",
    letterSpacing: 4,
  },
  textStyle: {
    fontSize: 22,
    fontWeight: "400",
    color: "white",
    letterSpacing: 4,
  },
});

export default memo(Card);
