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
  bank_card_name: string;
  name: string;
  card_number: string;
  validity: string;
  cvv: string;
  card_type: CardType;
}
