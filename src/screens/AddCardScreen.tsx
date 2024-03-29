import { Button, Image, StyleSheet, TextInput } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { Box, Text } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "../components/core/Button";
import { cardTypeIndex, CARD_TYPE_IMAGES, Buffer } from "../utils/constants";
import useCardsStore from "../stores/useCardsStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "../navigation/AppNavigation";

type ViewCardScreenNavigationProps = NativeStackScreenProps<
  StackNavigatorParamList,
  "AddCard"
>;

const AddCardScreen = ({
  navigation,
  route,
}: ViewCardScreenNavigationProps) => {
  const insets = useSafeAreaInsets();
  const { card } = route.params || {};

  const { cards, setCard } = useCardsStore();
  const [bankCardData, setBankCardData] = useState<IBankCard>({
    card_number: card?.card_number || "",
    card_type: card?.card_type || "unknown",
    bank_card_name: card?.bank_card_name || "",
    cvv: card?.cvv || "",
    name: card?.name || "",
    type: "BANK_CARD",
    validity: card?.validity || "",
  });

  const isDisabled =
    !bankCardData.card_number ||
    !bankCardData.name ||
    !bankCardData.validity ||
    !bankCardData.cvv;

  const handleAddCard = () => {
    setCard([bankCardData, ...cards]);
    setBankCardData({
      card_number: "",
      card_type: "unknown",
      bank_card_name: "",
      cvv: "",
      name: "",
      type: "BANK_CARD",
      validity: "",
    });
    navigation.goBack();
  };

  const handleUpdateCard = () => {
    const updatedCards = cards.map((c) => {
      if (c.card_number === card?.card_number) {
        return bankCardData;
      }
      return c;
    });
    setCard(updatedCards);
    navigation.navigate("Home");
  };

  function detectCardType(cardNumber: string) {
    let jcb_regex = new RegExp("^(?:2131|1800|35[0-9]{3})[0-9]{3,}$");
    let amex_regex = new RegExp("^3[47][0-9]{13}$");
    let diners_regex = new RegExp("^3(?:0[0-5]|[68][0-9])[0-9]{11}$");
    let visa_regex = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
    let mastercard_regex = new RegExp(
      "^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$"
    );
    let discover_regex = new RegExp("^6(?:011|5[0-9]{2})[0-9]{12}$");

    cardNumber = cardNumber.replace(/\D/g, "");

    var cardType: CardType = "unknown";
    if (cardNumber.match(jcb_regex)) {
      cardType = "jcb";
    } else if (cardNumber.match(amex_regex)) {
      cardType = "amex";
    } else if (cardNumber.match(diners_regex)) {
      cardType = "dinersclub";
    } else if (cardNumber.match(visa_regex)) {
      cardType = "visa";
    } else if (cardNumber.match(mastercard_regex)) {
      cardType = "mastercard";
    } else if (cardNumber.match(discover_regex)) {
      cardType = "discover";
    }

    return cardType;
  }

  useEffect(() => {
    let type = detectCardType(
      new Buffer(bankCardData.card_number, "base64").toString()
    );
    setBankCardData({ ...bankCardData, card_type: type as CardType });
  }, [new Buffer(bankCardData.card_number, "base64").toString()]);

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
          {card ? "Edit Card" : "Add New Card"}
        </Text>
      </Box>

      <Box flex={1} mx="4" mt="4">
        <TextInput
          style={styles.input}
          placeholder="Bank/Card Name"
          value={bankCardData.bank_card_name}
          onChangeText={(value) =>
            setBankCardData({ ...bankCardData, bank_card_name: value })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Card Holder Name"
          value={bankCardData.name}
          onChangeText={(value) =>
            setBankCardData({ ...bankCardData, name: value })
          }
        />
        <Box position="relative">
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={new Buffer(bankCardData.card_number, "base64").toString()}
            onChangeText={(value) =>
              setBankCardData({
                ...bankCardData,
                card_number: new Buffer(value.replaceAll(" ", "")).toString(
                  "base64"
                ),
              })
            }
            keyboardType="number-pad"
          />
          {bankCardData.card_type !== "unknown" && (
            <Box position="absolute" right={4} top={5}>
              <Image
                source={
                  bankCardData.card_type &&
                  CARD_TYPE_IMAGES[cardTypeIndex[bankCardData.card_type]]
                }
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 80,
                }}
              />
            </Box>
          )}
        </Box>

        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextInput
            style={{ ...styles.input, width: "48%" }}
            placeholder="Expiry Date"
            value={bankCardData.validity}
            onChangeText={(value) =>
              setBankCardData({ ...bankCardData, validity: value })
            }
            maxLength={5}
          />
          <TextInput
            style={{ ...styles.input, width: "48%" }}
            keyboardType="number-pad"
            placeholder="CVV"
            value={new Buffer(bankCardData.cvv, "base64").toString()}
            onChangeText={(value) =>
              setBankCardData({
                ...bankCardData,
                cvv: new Buffer(value).toString("base64"),
              })
            }
            secureTextEntry
            maxLength={3}
          />
        </Box>
        <Box alignItems="center">
          <Button
            title={card ? "Update Card" : "Add Card"}
            onPress={card ? handleUpdateCard : handleAddCard}
            disabled={isDisabled}
          />
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
  },
});

export default memo(AddCardScreen);
