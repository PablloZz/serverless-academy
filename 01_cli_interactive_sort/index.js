#!/usr/bin/env node
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });
const {
  alphabeticallyWordsSorting,
  ascendingNumbersSorting,
  ascendingWordsSortingByLettersAmount,
  descendingNumbersSorting,
  getUniqueValues,
  getUniqueWords,
} = require("./helpers/helpers.js");

function getSortedValues(sortingType, values) {
  switch (Number(sortingType)) {
    case 1: {
      return alphabeticallyWordsSorting(values);
    }
    case 2: {
      return ascendingNumbersSorting(values);
    }
    case 3: {
      return descendingNumbersSorting(values);
    }
    case 4: {
      return ascendingWordsSortingByLettersAmount(values);
    }
    case 5: {
      return getUniqueWords(values);
    }
    case 6: {
      return getUniqueValues(values);
    }
  }
}

async function init() {
  const stringToSort = await rl.question(
    "Hello. Enter a few words or digits dividing them in spaces:"
  );
  const sortingType = await rl.question(
    `How would you like to sort values:
  1. Sort words alphabetically.
  2. Show numbers from lesser to greater.
  3. Show numbers from bigger to smaller.
  4. Display words in ascending order by number of letters in the word.
  5. Show only unique words.
  6. Display only unique values from the set of words and numbers entered by the user.
  Please, enter "exit" to exit the program.`
  );

  if (sortingType === "exit") {
    console.log("Goodbye! Come back again!");
    process.exit(1);
  }

  const sortedValues = getSortedValues(sortingType, stringToSort);
  console.log(sortedValues);
  init();
}

init();
