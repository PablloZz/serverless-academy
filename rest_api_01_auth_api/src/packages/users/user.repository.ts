import { database } from "@/packages/database/database.js";

async function getUser(...options: unknown[]) {
  const user = await database.query(
    "SELECT * FROM users WHERE email=$1",
    options
  );

  return user.rows[0];
}

async function createUser(...options: unknown[]) {
  const newUser = await database.query(
    "INSERT INTO users(email, password_salt, password_hash) VALUES($1, $2, $3) RETURNING *",
    options
  );

  return newUser.rows[0];
}

export { getUser, createUser };
