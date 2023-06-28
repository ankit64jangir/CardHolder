import { useNavigation } from "@react-navigation/core";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { BackArrowIcon } from "../../icons";
import theme from "../../theme";

type BackButtonProps = {
  onPress?: () => any;
};

export default function BackButton({ onPress }: BackButtonProps) {
  const navigation = useNavigation();

  onPress =
    onPress ||
    useCallback(() => {
      navigation.goBack();
    }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <BackArrowIcon size={28} color={theme.colors.blue} />
    </TouchableOpacity>
  );
}
