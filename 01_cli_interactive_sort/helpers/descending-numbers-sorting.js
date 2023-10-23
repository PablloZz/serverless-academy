function descendingNumbersSorting(numbers) {
  return numbers
    .split(" ")
    .filter((word) => !isNaN(word))
    .sort((a, b) => b - a)
    .join(" ");
}

module.exports = { descendingNumbersSorting };
