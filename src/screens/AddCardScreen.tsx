import { Pressable } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { Box, Text } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddCardScreen = () => {
  const [data, setData] = useState<IBankCard[]>([
    {
      card_number: 111111111111,
      card_type: "visa",
      cvv: 123,
      name: "ANKIT",
      type: "BANK_CARD",
      validity: "10/27",
    },
    {
      card_number: 111111111111,
      card_type: "visa",
      cvv: 123,
      name: "ABHISHEK",
      type: "BANK_CARD",
      validity: "10/27",
    },
    {
      card_number: 111111111111,
      card_type: "visa",
      cvv: 123,
      name: "SATISH",
      type: "BANK_CARD",
      validity: "10/27",
    },
  ]);

  const storeData = async (value: IBankCard) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("cards", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const insets = useSafeAreaInsets();
  return (
    <Box flex={1}>
      <Box
        style={{ paddingTop: insets.top + 8 }}
        justifyContent="space-between"
        flexDirection="row"
        bg="lightGray"
        px="4"
        pb="4"
      >
        <Text>AddCardScreen</Text>
      </Box>

      <Pressable
        onPress={() => {
          storeData(data);
        }}
      >
        <Box>
          <Text>Add</Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default memo(AddCardScreen);
