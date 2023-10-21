function alphabeticcalyWordsSorting(words) {
  return words
    .split(" ")
    .sort((a, b) => a.localeCompare(b))
    .join(" ");
}

module.exports = { alphabeticcalyWordsSorting };
