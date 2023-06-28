import { Button, Pressable, StyleSheet, TextInput } from "react-native";
import React, { memo, useState } from "react";
import { Box, Text } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../components/core/Button";

const AddCardScreen = () => {
  const insets = useSafeAreaInsets();

  const [bankCardData, setBankCardData] = useState<IBankCard>({
    card_number: "",
    card_type: undefined,
    cvv: "",
    name: "",
    type: "BANK_CARD",
    validity: "",
  });

  const handleAddCard = async () => {
    console.log("New Card Details:", bankCardData);

    try {
      const jsonValue = JSON.stringify([
        { ...bankCardData, card_type: "visa" },
      ]);
      console.log(jsonValue);

      await AsyncStorage.setItem("cards", jsonValue);
    } catch (e) {
      // saving error
    }
    setBankCardData({
      card_number: "",
      card_type: undefined,
      cvv: "",
      name: "",
      type: "BANK_CARD",
      validity: "",
    });
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
