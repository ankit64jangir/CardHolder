import React, { memo, useState } from "react";
import { Box, Text } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "../components/core/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "../navigation/AppNavigation";
import Card from "../components/Card";
import { useSharedValue } from "react-native-reanimated";
import { StyleSheet, TouchableOpacity } from "react-native";
import { maskCardNumber } from "../utils/constants";
import * as Clipboard from "expo-clipboard";

type ViewCardScreenNavigationProps = NativeStackScreenProps<
  StackNavigatorParamList,
  "ViewCard"
>;

const ViewCardScreen = ({
  navigation,
  route,
}: ViewCardScreenNavigationProps) => {
  const insets = useSafeAreaInsets();
  const { card } = route.params;

  const [visibleCardNumber, setVisibleCardNumber] = useState(false);
  const [visibleCVV, setVisibleCVV] = useState(false);

  const cardNumberTapped = async () => {
    if (!visibleCardNumber) {
      setVisibleCardNumber(true);
    }
    if (visibleCardNumber) {
      await Clipboard.setStringAsync(String(card.card_number));
      setVisibleCardNumber(false);
    }
  };

  const cvvTapped = () => {
    setVisibleCVV((prev) => !prev);
  };

  return (
    <Box flex={1}>
      <Box
        style={{ paddingTop: insets.top + 10 }}
        alignItems="center"
        flexDirection="row"
        px="4"
        pb="2"
      >
        <BackButton />
        <Text ml="2" fontSize={28} fontWeight="700">
          View Card
        </Text>
      </Box>

      <Box
        position="relative"
        style={styles.shadow}
        borderRadius={12}
        bg="white"
        mx="2"
        mt="2"
      >
        <Card
          card={card}
          expand={useSharedValue(0)}
          index={0}
          displayCardAnimatedStyle={false}
        />
        <Box my="8" px="4">
          <Box>
            <Text fontWeight="600" color="grayText">
              Card Number
            </Text>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mt="2"
            >
              <Text letterSpacing={2}>
                {maskCardNumber({
                  cardNumber: String(card.card_number),
                  visible: visibleCardNumber,
                })}
              </Text>
              <TouchableOpacity onPress={cardNumberTapped}>
                <Box
                  borderWidth={0.5}
                  px="3"
                  py="0.5"
                  borderRadius={50}
                  borderColor="grayText"
                >
                  <Text
                    textAlign="center"
                    color="blue"
                    fontSize={14}
                    fontWeight="600"
                    fontStyle="italic"
                  >
                    {visibleCardNumber ? "COPY" : "Tap to see"}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>

          <Box mt="6">
            <Text fontWeight="600" color="grayText">
              Valid till
            </Text>
            <Text mt="2" letterSpacing={1}>
              {card.validity}
            </Text>
          </Box>

          <Box mt="6">
            <Text fontWeight="600" color="grayText">
              CVV
            </Text>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mt="2"
            >
              <Text letterSpacing={1}>
                {visibleCVV ? String(card.cvv) : "•••"}
              </Text>
              <TouchableOpacity onPress={cvvTapped}>
                <Box
                  borderWidth={0.5}
                  px="3"
                  py="0.5"
                  borderRadius={50}
                  borderColor="grayText"
                >
                  <Text
                    textAlign="center"
                    color="blue"
                    fontSize={14}
                    fontWeight="600"
                    fontStyle="italic"
                  >
                    {visibleCVV ? "Hide" : "Tap to see"}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});

export default memo(ViewCardScreen);
