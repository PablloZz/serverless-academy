function alphabeticcalyWordsSorting(words) {
  return words
    .split(" ")
    .filter((word) => isNaN(word))
    .sort((a, b) => a.localeCompare(b))
    .join(" ");
}

module.exports = { alphabeticcalyWordsSorting };
