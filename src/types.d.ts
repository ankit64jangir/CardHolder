type CardType =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "dinersclub"
  | "jcb"
  | "unknown"
  | undefined;

interface IBankCard {
  type: "BANK_CARD";
  name: string;
  card_number: string;
  validity: string;
  cvv: string;
  card_type: CardType;
}
