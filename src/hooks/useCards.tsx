import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useCards() {
  const [cards, setCards] = useState<IBankCard[]>([]);

  const getAllCards = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("cards");
      if (jsonValue !== null) {
        const parsedArray = JSON.parse(jsonValue);
        setCards(parsedArray);
      }
    } catch (error) {
      console.log("Error retrieving array:", error);
    }
  };
  useEffect(() => {
    getAllCards();
  }, []);

  return {
    cards,
  };
}
