import { readFile } from "fs/promises";
import path from "path";

console.time("Execution Time");

const allFilesUniqueValues = [];

for (let index = 0; index <= 19; index++) {
  const fileValues = await readFile(
    path.resolve("db", "word-combinations", `out${index}.txt`),
    "utf8"
  );
  const uniqueFileValues = new Set(fileValues.split("\n"));
  allFilesUniqueValues.push([...uniqueFileValues]);
}

const valuesCount = new Map();
allFilesUniqueValues.forEach(values => {
  values.forEach(value => {
    if (valuesCount.has(value)) {
      valuesCount.set(value, valuesCount.get(value) + 1);
    }
    if (!valuesCount.has(value)) {
      valuesCount.set(value, 1);
    }
  });
});

const uniqueValuesCount = valuesCount.size;
let minTenFilesValuesCount = 0;
let allFilesValuesCount = 0;

for (const [, value] of valuesCount) {
  if (value >= 10) {
    minTenFilesValuesCount = minTenFilesValuesCount + 1;
  }
  if (value === 20) {
    allFilesValuesCount = allFilesValuesCount + 1;
  }
}

console.log("Unique values count:", uniqueValuesCount);
console.log(
  "The number of values that appeared in at least 10 files:",
  minTenFilesValuesCount
);
console.log(
  "The number of values that appeared in all files:",
  allFilesValuesCount
);

console.timeEnd("Execution Time");
