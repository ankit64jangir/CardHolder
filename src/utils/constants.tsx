export const CARD_TYPE_IMAGES = [
  require("../../assets/images/dinersclub.png"),
  require("../../assets/images/mastercard.png"),
  require("../../assets/images/discover.png"),
  require("../../assets/images/amex.png"),
  require("../../assets/images/visa.png"),
  require("../../assets/images/jcb.png"),
];

export const cardTypeIndex: any = {
  dinersclub: 0,
  mastercard: 1,
  discover: 2,
  amex: 3,
  visa: 4,
  jcb: 5,
};

type MaskCardNumberTypes = {
  cardNumber: string;
  visible: boolean;
};

export function maskCardNumber({ cardNumber, visible }: MaskCardNumberTypes) {
  const visibleDigits = 4;
  const maskedDigits = cardNumber.length - visibleDigits;
  const maskedNumber = cardNumber.slice(0, maskedDigits).replace(/\d/g, "•");
  const formattedNumber = maskedNumber.replace(/(.{4})/g, "$1 ");
  return visible
    ? cardNumber.replace(/(.{4})/g, "$1 ")
    : formattedNumber + cardNumber.slice(maskedDigits);
}

export const defaultGradient = ["#2B5150", "#2E898A", "#159D9F"];
export const visaGradient = ["#003399", "#0077FF", "#33AAFF", "#66CCFF"];
export const mastercardGradient = ["#FF4D4D", "#FF8C1A", "#FFCC00"];
export const amexGradient = ["#003399", "#730099", "#BD00FF"];
export const discoverGradient = ["#FFB800", "#FFD700"];
export const dinersClubGradient = ["#444444", "#888888", "#CCCCCC"];
export const jcbGradient = ["#003399", "#CC0000"];

export const Buffer = require("buffer").Buffer;
