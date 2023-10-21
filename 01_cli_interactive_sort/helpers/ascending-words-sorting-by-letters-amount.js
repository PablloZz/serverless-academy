function ascendingWordsSortingByLettersAmount(words) {
  return words
    .split(" ")
    .sort((a, b) => a.length - b.length)
    .join(" ");
}

module.exports = { ascendingWordsSortingByLettersAmount };
