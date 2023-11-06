import { QueryArrayResult } from "pg";

interface IDatabase {
  connect: () => void;
  query: (text: string, params?: unknown[]) => Promise<QueryArrayResult<any>>;
}

export { type IDatabase };
