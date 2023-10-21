function ascendingNumbersSorting(numbers) {
  return numbers
    .split(" ")
    .sort((a, b) => a - b)
    .join(" ");
}

module.exports = { ascendingNumbersSorting };
