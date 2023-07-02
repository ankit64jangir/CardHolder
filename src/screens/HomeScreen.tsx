import { useNavigation } from "@react-navigation/native";
import { memo, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../components/Card";
import useCards from "../hooks/useCards";
import { CloseIcon, PlusIcon } from "../icons";
import { NavigationType } from "../navigation/AppNavigation";
import theme, { Box, Text } from "../theme";
import { height } from "../utils/dimensions";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationType<"ViewCard">>();
  const expanded = useSharedValue(0);

  const { cards } = useCards();
  const [scrollContainerHeight, setScrollContainerHeight] = useState(height);

  const closeAnimatedBtn = useAnimatedStyle(() => {
    return {
      opacity: withTiming(expanded.value),
    };
  });

  const handleCardPress = (card: IBankCard) => {
    setScrollContainerHeight((height / 3.5) * cards.length * 1.3);
    expanded.value = 1;
    if (expanded.value == 1) {
      navigation.navigate("ViewCard", { card: card });
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
        <AnimatedPressable
          onPress={() => {
            expanded.value = 0;
            setScrollContainerHeight(height);
          }}
          style={[closeAnimatedBtn]}
        >
          <CloseIcon color={theme.colors.blue} size={24} />
        </AnimatedPressable>
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
            navigation.navigate("AddCard");
          }}
        >
          <Box
            bg="blue"
            borderRadius={100}
            justifyContent="center"
            alignItems="center"
            width={54}
            height={54}
          >
            <PlusIcon size={30} color={theme.colors.white} />
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default memo(HomeScreen);
