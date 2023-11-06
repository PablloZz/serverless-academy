import express, { type Application } from "express";
import { authRouter } from "#/auth/auth.js";
import { userRouter } from "#/users/users.js";
import { IApp } from "./interfaces/interfaces.js";
import { type IDatabase } from "@/packages/database/database.js";

class App implements IApp {
  private app: Application;

  private PORT: number;

  private database: IDatabase;

  public constructor(database: IDatabase) {
    this.app = express();
    this.app.use(express.json());
    this.PORT = 3000;
    this.database = database;
  }

  private initRoutes() {
    this.app.use("/auth", authRouter);
    this.app.use("/", userRouter);
  }

  private async initDatabaseTables() {
    await this.database.query(`
      CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email text,
      password_hash text,
      password_salt text
    );
  `);
  }

  public async init() {
    console.log("Application initialization...");

    this.initRoutes();

    await this.database.connect();

    await this.initDatabaseTables();

    this.app.listen(this.PORT, () => {
      console.log(`App is listening on port ${this.PORT}`);
    });
  }
}

export { App };
