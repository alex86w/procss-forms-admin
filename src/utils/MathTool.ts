export const BinaryToDecimal = function(b: string) {
  return parseInt(b, 2);
};
export const DecimalToBinary = function(d: number) {
  return d.toString(2);
};

export default {
  BinaryToDecimal,
  DecimalToBinary,
};
