#!/usr/bin/env node
import { writeFile } from "fs";
import path from "path";
import inquirer from "inquirer";

async function init() {
  const questions = [
    {
      type: "input",
      name: "userName",
      message: "Enter the user name. To cancel press ENTER:",
      validate: (userName) => {
        if (userName === "") {
          process.exit(1);
        }

        return true;
      },
    },
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
      validate: (age) => {
        if (age < 1 || !age || isNaN(age)) {
          return "Please Enter a valid age";
        }

        return true;
      },
    },
  ];

  const answers = await inquirer.prompt(questions);
  writeFile(
    path.resolve("db", "database.txt"),
    `${JSON.stringify(answers)}\n`,
    { flag: "a" },
    (error) => {
      if (error) {
        console.error(error);
      }
    }
  );
  init();
}

init();
