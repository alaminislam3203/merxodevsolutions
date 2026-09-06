/**
 * Truncate text to a given number of words.
 * If text has fewer or equal words, returns it unchanged.
 */
export function truncateWords(text, limit = 20) {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
}
