export function capitalize(text: string) {
  const words = text.split(' ');
  const wordsCapitalized = words.map((word) => {
    const firstChar = word.charAt(0).toUpperCase();
    const rest = word.substring(1).toLowerCase();
    return firstChar + rest;
  });
  return wordsCapitalized.join(' ');
}
