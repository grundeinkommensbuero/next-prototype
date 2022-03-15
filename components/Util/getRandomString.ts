// Generates a random string (e.g. for generating random password)
export const getRandomString = (bytes: number) => {
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues).map(intToHex).join('');
};
function intToHex(nr: number) {
  return nr.toString(16).padStart(2, '0');
}
