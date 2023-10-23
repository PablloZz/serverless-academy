function getUniqueWords(words) {
  return Array.from(
    new Set(words.split(" ").filter((word) => isNaN(word)))
  ).join(" ");
}

module.exports = { getUniqueWords };
