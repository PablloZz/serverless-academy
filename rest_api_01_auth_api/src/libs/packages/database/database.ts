import { Database } from "./database.package.js";
import { getEnv } from "@/packages/config/config.js";

const database = new Database(getEnv());

export { database };
export { type IDatabase } from "./libs/interfaces/interfaces.js";
