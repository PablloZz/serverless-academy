#!/usr/bin/env node
import inquirer from "inquirer";
import { readFile, writeFile } from "fs/promises";
import path from "path";

async function getUserFromDB() {
  const existingUsers = await readFile(
    path.resolve("db", "database.txt"),
    "utf8"
  );
  console.log(existingUsers);
  const usernameToSearchQuestion = [
    {
      type: "input",
      name: "usernameToSearch",
      message: "Enter user name you want to find in DB",
    },
  ];
  const { usernameToSearch } = await inquirer.prompt(usernameToSearchQuestion);

  const searchedUser = JSON.parse(existingUsers).find(user => {
    return usernameToSearch.toLowerCase() === user.username.toLowerCase();
  });

  if (searchedUser) {
    console.log(
      ` User ${usernameToSearch} was found:\n ${JSON.stringify(searchedUser)}`
    );
  } else {
    console.log(`User ${usernameToSearch} doesn't exist`);
  }
}

async function exitProcess() {
  const shouldSelectFromDBQuestion = [
    {
      type: "confirm",
      name: "shouldSelectFromDB",
      message: "Would you like to search values in DB?",
    },
  ];
  const { shouldSelectFromDB } = await inquirer.prompt(
    shouldSelectFromDBQuestion
  );

  if (shouldSelectFromDB) {
    try {
      await getUserFromDB();
    } catch (error) {
      console.error(error);
    } finally {
      process.exit(1);
    }
  } else {
    process.exit(1);
  }
}

async function init() {
  const usernameQuestion = [
    {
      type: "input",
      name: "username",
      message: "Enter the user name. To cancel press ENTER:",
    },
  ];

  const { username } = await inquirer.prompt(usernameQuestion);

  if (username === "") {
    await exitProcess();
  }

  const userInfoQuestions = [
    {
      type: "list",
      name: "gender",
      message: "Choose your Gender:",
      choices: ["male", "female"],
    },
    {
      type: "input",
      name: "age",
      message: "Enter your age:",
      validate: age => {
        if (age < 1 || !age || isNaN(age)) {
          return "Please Enter a valid age";
        }

        return true;
      },
    },
  ];
  const userInfo = await inquirer.prompt(userInfoQuestions);
  const newUserEntry = { username, ...userInfo };
  const existingUsers = await readFile(
    path.resolve("db", "database.txt"),
    "utf8"
  );
  const parsedUsers = JSON.parse(existingUsers || "[]");
  try {
    writeFile(
      path.resolve("db", "database.txt"),
      JSON.stringify([newUserEntry, ...parsedUsers], null, 2)
    );
  } catch (error) {
    console.error(error);
  }

  init();
}

init();
