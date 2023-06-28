import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const AddCreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");

  const handleAddCard = () => {
    // Perform card validation and add card logic here
    // For simplicity, we'll just log the card details
    console.log("New Card Details:", {
      cardNumber,
      expiryDate,
      cvv,
    });

    // Clear input fields after adding the card
    setCardNumber("");
    setExpiryDate("");
    setCVV("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCVV}
        secureTextEntry
      />
      <Button title="Add Card" onPress={handleAddCard} />
    </View>
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
    borderColor: "#ccc",
  },
});

export default AddCreditCardForm;
