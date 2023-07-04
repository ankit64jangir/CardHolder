import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { Box, Text } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "../components/core/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "../navigation/AppNavigation";
import Card from "../components/Card";
import Animated, { useSharedValue } from "react-native-reanimated";
import { StyleSheet, TouchableOpacity } from "react-native";
import { maskCardNumber } from "../utils/constants";
import * as Clipboard from "expo-clipboard";
import useCardsStore from "../stores/useCardsStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTheme } from "../theme/theme";
import { MenuIcon } from "../icons";

type ViewCardScreenNavigationProps = NativeStackScreenProps<
  StackNavigatorParamList,
  "ViewCard"
>;

const ViewCardScreen = ({
  navigation,
  route,
}: ViewCardScreenNavigationProps) => {
  const insets = useSafeAreaInsets();
  const { cards, setCard } = useCardsStore();
  const { card } = route.params;
  const theme = useTheme();

  const [visibleCardNumber, setVisibleCardNumber] = useState(false);
  const [visibleCVV, setVisibleCVV] = useState(false);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "25%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

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

  const deleteCardHandler = () => {
    const updatedCards = cards.filter(
      (c) => c.card_number !== card.card_number
    );
    setCard(updatedCards);
    handleCloseModalPress();
    navigation.goBack();
  };

  const editCardHandler = () => {
    handleCloseModalPress();
    navigation.navigate("AddCard", { card });
  };

  return (
    <Box flex={1}>
      <Box
        style={{ paddingTop: insets.top + 10 }}
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        px="4"
        pb="2"
      >
        <Box flexDirection="row" alignItems="center">
          <BackButton />
          <Text ml="2" fontSize={28} fontWeight="700">
            View Card
          </Text>
        </Box>

        <TouchableOpacity onPress={handlePresentModalPress}>
          <MenuIcon size={20} />
        </TouchableOpacity>
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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={({ animatedIndex, style }) => (
          <Animated.View
            onTouchEnd={() => bottomSheetModalRef.current?.close()}
            style={[style, { backgroundColor: theme.colors.modalBackdrop }]}
          />
        )}
        handleIndicatorStyle={{
          display: "none",
        }}
      >
        <TouchableOpacity
          style={{
            paddingBottom: 12,
            borderTopColor: theme.colors.black,
          }}
          onPress={editCardHandler}
        >
          <Text textAlign="center">Edit</Text>
        </TouchableOpacity>
        <Box borderTopWidth={StyleSheet.hairlineWidth}>
          <TouchableOpacity
            style={{
              padding: 12,
              borderTopColor: theme.colors.black,
            }}
            onPress={deleteCardHandler}
          >
            <Text
              textAlign="center"
              style={{
                color: "red",
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </Box>
        <Box borderTopWidth={StyleSheet.hairlineWidth}>
          <TouchableOpacity
            style={{
              padding: 12,
              borderTopColor: theme.colors.black,
            }}
            onPress={handleCloseModalPress}
          >
            <Text textAlign="center" fontWeight="600" fontSize={18}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>
      </BottomSheetModal>
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
