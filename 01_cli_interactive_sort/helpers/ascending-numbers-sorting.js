function ascendingNumbersSorting(numbers) {
  return numbers
    .split(" ")
    .filter((word) => !isNaN(word))
    .sort((a, b) => a - b)
    .join(" ");
}

module.exports = { ascendingNumbersSorting };
