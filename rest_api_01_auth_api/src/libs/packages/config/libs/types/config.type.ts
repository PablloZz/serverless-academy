type Config = {
  DB_CONNECTION_STRING: string;
  JWT_SECRET: string;
  ACCESS_TOKEN_TTL: string | number;
};

export { type Config as TConfig };
