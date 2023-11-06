import fs from "fs";
import path from "path";
import { parseBuffer } from "./helpers/helpers.js";
import { type TConfig } from "./libs/types/types.js";

function getEnv(): TConfig {
  const envFilePath = path.join(path.resolve(".env"));
  const bufferEnv = fs.readFileSync(envFilePath, "utf8");
  const envObject = parseBuffer(bufferEnv);

  Object.keys(envObject || {}).map(key => {
    if (!process.env[key] && process.env[key] !== envObject[key]) {
      process.env[key] = envObject[key];
    }
  });

  const { DB_CONNECTION_STRING, JWT_SECRET, ACCESS_TOKEN_TTL } =
    process.env as TConfig;

  return { DB_CONNECTION_STRING, JWT_SECRET, ACCESS_TOKEN_TTL };
}

export { getEnv };
