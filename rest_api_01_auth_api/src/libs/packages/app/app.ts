import { App } from "./app.package.js";
import { database } from "@/packages/database/database.js";

const app = new App(database);

export { app };
