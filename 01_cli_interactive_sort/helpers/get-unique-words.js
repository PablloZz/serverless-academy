function getUniqueWords(words) {
  return Array.from(new Set(words.split(" "))).join(" ");
}

module.exports = { getUniqueWords };
