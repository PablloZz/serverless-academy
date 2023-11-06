import pg from "pg";
import { type IDatabase } from "./libs/interfaces/interfaces.js";
import { type TConfig } from "@/packages/config/config.js";

class Database implements IDatabase {
  private appConfig: TConfig;

  private client;

  public constructor(appConfig: TConfig) {
    this.appConfig = appConfig;
    const { Client } = pg;
    const DB_CONNECTION_STRING = this.appConfig.DB_CONNECTION_STRING;
    this.client = new Client(DB_CONNECTION_STRING);
  }

  public async connect() {
    try {
      console.log("Establish Database Connection...");
      await this.client.connect();
      console.log("Database Is Connected...");
    } catch (error) {
      console.error(error);
    }
  }

  public query(
    text: string,
    params?: unknown[]
  ): ReturnType<IDatabase["query"]> {
    return this.client.query(text, params);
  }
}

export { Database };
