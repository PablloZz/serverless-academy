function alphabeticallyWordsSorting(words) {
  return words
    .split(" ")
    .filter((word) => isNaN(word))
    .sort((a, b) => a.localeCompare(b))
    .join(" ");
}

module.exports = { alphabeticallyWordsSorting };
