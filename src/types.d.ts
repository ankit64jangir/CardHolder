interface IBankCard {
  type: "BANK_CARD";
  name: string;
  card_number: number;
  validity: string;
  cvv: number;
  card_type: "visa" | "mastercard" | "amex" | "discover" | "dinersclub" | "jcb";
}
