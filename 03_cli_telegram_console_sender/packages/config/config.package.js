import fs from "fs";
import path from "path";
import { parseBuffer } from "./helpers/helpers.js";

function getEnv() {
  const envFilePath = path.join(path.resolve(".env"));
  const bufferEnv = fs.readFileSync(envFilePath, "utf8");
  const envObject = parseBuffer(bufferEnv);

  Object.keys(envObject || {}).map(key => {
    if (!process.env[key] && process.env[key] !== envObject[key]) {
      process.env[key] = envObject[key];
    }
  });

  const { TELEGRAM_TOKEN, CHAT_ID } = process.env;

  return { TELEGRAM_TOKEN, CHAT_ID };
}

export { getEnv };
