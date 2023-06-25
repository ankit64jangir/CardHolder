import { Dimensions, Text } from "react-native";
import React, { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Box } from "../theme";
const colors = ["#2B5150", "#2E898A", "#159D9F"];
const { height } = Dimensions.get("window");

const Card = () => {
  return (
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
          ANKIT JANGIR
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            color: "white",
            textAlignVertical: "center",
          }}
        >
          **** **** **** 1234
        </Text>
      </Box>
    </LinearGradient>
  );
};

export default memo(Card);
