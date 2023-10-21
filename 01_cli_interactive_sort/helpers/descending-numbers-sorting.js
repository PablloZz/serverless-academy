function descendingNumbersSorting(numbers) {
  return numbers
    .split(" ")
    .sort((a, b) => b - a)
    .join(" ");
}

module.exports = { descendingNumbersSorting };
