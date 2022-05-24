export function generateNbspString(numberOfChars = 1) {
  return Array.from(Array(numberOfChars).keys()).fill(String.fromCharCode(160)).join('')
}