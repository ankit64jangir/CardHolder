import { Button, Pressable, StyleSheet, TextInput } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { Box, Text } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../components/core/Button";
import useCards from "../hooks/useCards";

const AddCardScreen = () => {
  const insets = useSafeAreaInsets();

  const { cards } = useCards();
  const [bankCardData, setBankCardData] = useState<IBankCard>({
    card_number: "",
    card_type: "unknown",
    cvv: "",
    name: "",
    type: "BANK_CARD",
    validity: "",
  });

  const handleAddCard = async () => {
    try {
      const jsonValue = JSON.stringify([...cards, bankCardData]);
      console.log(jsonValue);
      await AsyncStorage.setItem("cards", jsonValue);
    } catch (e) {
      // saving error
    }
    setBankCardData({
      card_number: "",
      card_type: "unknown",
      cvv: "",
      name: "",
      type: "BANK_CARD",
      validity: "",
    });
  };

  function detectCardType(cardNumber: string) {
    cardNumber = cardNumber.replace(/\D/g, "");

    var patterns: any = {
      visa: /^4[0-9]{6,}$/,
      mastercard:
        /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/,
      amex: /^3[47][0-9]{5,}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
      dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
      jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
    };

    for (var cardType in patterns) {
      if (patterns[cardType].test(cardNumber)) {
        return cardType;
      }
    }

    return "unknown";
  }

  useEffect(() => {
    let type = detectCardType(bankCardData.card_number);
    // setCard_Type(type);
    setBankCardData({ ...bankCardData, card_type: type as CardType });
  }, [bankCardData.card_number]);

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
          Add New Card
        </Text>
      </Box>

      <Box flex={1} mx="4" mt="4">
        <TextInput
          style={styles.input}
          placeholder="Card Holder Name"
          value={bankCardData.name}
          onChangeText={(value) =>
            setBankCardData({ ...bankCardData, name: value })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={bankCardData.card_number}
          onChangeText={(value) =>
            setBankCardData({ ...bankCardData, card_number: value })
          }
          keyboardType="number-pad"
        />
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
            value={String(bankCardData.cvv)}
            onChangeText={(value) =>
              setBankCardData({ ...bankCardData, cvv: value })
            }
            secureTextEntry
            maxLength={3}
          />
        </Box>
        <Box alignItems="center">
          <Button title="Add Card" onPress={handleAddCard} />
        </Box>
      </Box>

      {/* <Pressable
        onPress={() => {
          storeData(data);
        }}
      >
        <Box>
          <Text>Add</Text>
        </Box>
      </Pressable> */}
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
