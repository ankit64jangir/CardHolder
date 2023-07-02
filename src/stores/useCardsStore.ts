import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type CardsStoreTypes = {
  cards: IBankCard[];
  setCard: (card: IBankCard) => void;
};

const cards: IBankCard[] = [];

const useCardsStore = create<CardsStoreTypes>((set, get) => ({
  cards: cards,
  setCard: async (card) => {
    // Update the store
    set((state) => ({ cards: [...state.cards, card] }));

    // Update AsyncStorage
    try {
      const storedCards = await AsyncStorage.getItem("cards");
      let parsedArray: IBankCard[] = [];

      if (storedCards !== null) {
        parsedArray = JSON.parse(storedCards);
      }

      parsedArray.push(card);
      await AsyncStorage.setItem("cards", JSON.stringify(parsedArray));
    } catch (error) {
      console.log("Error adding card to AsyncStorage:", error);
    }
  },
}));

export const initializeCardsStore = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("cards");
    if (jsonValue !== null) {
      const parsedArray: IBankCard[] = JSON.parse(jsonValue);
      useCardsStore.setState({ cards: parsedArray });
    }
  } catch (error) {
    console.log("Error retrieving cards from AsyncStorage:", error);
  }
};

export default useCardsStore;
