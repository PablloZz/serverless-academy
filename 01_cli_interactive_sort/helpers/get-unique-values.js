function getUniqueValues(values) {
  return Array.from(new Set(values.split(" "))).join(" ");
}

module.exports = { getUniqueValues };
