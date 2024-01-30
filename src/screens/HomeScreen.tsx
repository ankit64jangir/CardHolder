import { useNavigation } from "@react-navigation/native";
import { memo, useState } from "react";
import { Platform, Pressable, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../components/Card";
import { PlusIcon } from "../icons";
import { NavigationType } from "../navigation/AppNavigation";
import useCardsStore from "../stores/useCardsStore";
import theme, { Box, Text } from "../theme";
import { height } from "../utils/dimensions";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedBox = Animated.createAnimatedComponent(Box);

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationType<"ViewCard">>();
  const expanded = useSharedValue(
    Platform.OS === "android" || Platform.OS === "ios" ? 0 : 1
  );
  const rotation = useSharedValue(0);

  const { cards } = useCardsStore();
  const [scrollContainerHeight, setScrollContainerHeight] = useState(height);

  const rotateAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: -rotation.value + "deg" }],
    };
  });

  const handleCardPress = (card: IBankCard) => {
    if (cards.length === 1) {
      navigation.navigate("ViewCard", { card: card });
    } else {
      rotation.value = withTiming(45);
      setScrollContainerHeight((height / 3.5) * cards.length * 1.3);
      expanded.value = 1;
      if (expanded.value == 1) {
        navigation.navigate("ViewCard", { card: card });
      }
    }
  };

  return (
    <Box flex={1}>
      <Box
        style={{ paddingTop: insets.top + 10 }}
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        px="4"
        pb="2"
      >
        <Box>
          <Text color="darkGray" fontWeight="500">
            {new Date().toUTCString().slice(0, 12)}
          </Text>
          <Text fontSize={28} fontWeight="700">
            My Card
          </Text>
        </Box>
      </Box>
      <Box mx="2">
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            height: scrollContainerHeight,
          }}
        >
          {cards?.map((card, index) => {
            return (
              <AnimatedPressable
                onPress={() => handleCardPress(card)}
                key={index}
                style={{
                  top: -120,
                }}
              >
                <Card key={index} card={card} expand={expanded} index={index} />
              </AnimatedPressable>
            );
          })}
        </Animated.ScrollView>
      </Box>
      <Box position="absolute" bottom={30} right={30} zIndex={50}>
        <TouchableOpacity
          onPress={() => {
            if (rotation.value === 45) {
              rotation.value = withTiming(0);
              expanded.value = 0;
              setScrollContainerHeight(height);
            } else {
              navigation.navigate("AddCard", {});
            }
          }}
          activeOpacity={0.2}
        >
          <AnimatedBox
            bg="blue"
            borderRadius={100}
            justifyContent="center"
            alignItems="center"
            width={54}
            height={54}
            style={[rotateAnimatedStyle]}
          >
            <PlusIcon size={30} color={theme.colors.white} />
          </AnimatedBox>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default memo(HomeScreen);
