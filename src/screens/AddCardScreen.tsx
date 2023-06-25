import { Text } from "react-native";
import React, { memo } from "react";
import { Box } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddCardScreen = () => {
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
    </Box>
  );
};

export default memo(AddCardScreen);
