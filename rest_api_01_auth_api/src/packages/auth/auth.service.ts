import { type Request } from "express";
import bcrypt from "bcrypt";
import { getUser, createUser } from "#/users/users.js";
import { token } from "@/packages/token/token.js";
import { StatusCode } from "@/enums/enums.js";

async function signUp(req: Request): Promise<Record<string, unknown>> {
  const { email, password } = req.body;

  if (!email || !password) {
    return {
      status: StatusCode.UNPROCESSED_ENTITY,
      data: { success: false, error: "Please, fill all the required fields" },
    };
  }

  const passwordSalt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, passwordSalt);
  const existingUser = await getUser(email);

  if (existingUser?.email) {
    return {
      status: StatusCode.CONFLICT,
      data: { success: false, error: "User with such email already exists" },
    };
  }

  const newUser = await createUser(email, passwordSalt, passwordHash);
  const accessToken = token.createAccessToken({
    id: newUser.id,
    email: newUser.email,
  });
  const refreshToken = token.createRefreshToken({
    id: newUser.id,
    email: newUser.email,
  });

  return {
    status: StatusCode.CREATED,
    data: {
      success: true,
      data: { id: newUser.id, accessToken, refreshToken },
    },
  };
}

async function signIn(req: Request): Promise<Record<string, unknown>> {
  const { email, password } = req.body;

  if (!email || !password) {
    return {
      status: StatusCode.UNPROCESSED_ENTITY,
      data: { success: false, error: "Please, fill all the required fields" },
    };
  }

  const user = await getUser(email);

  if (!user?.email) {
    return {
      status: StatusCode.NOT_FOUND,
      data: { success: true, error: "User with such email doesn't exist" },
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    return {
      status: StatusCode.BAD_REQUEST,
      data: { success: true, error: "Email or password isn't correct" },
    };
  }

  const accessToken = token.createAccessToken({
    id: user.id,
    email: user.email,
  });
  const refreshToken = token.createRefreshToken({
    id: user.id,
    email: user.email,
  });

  return {
    status: StatusCode.OK,
    data: {
      success: true,
      data: { id: user.id, accessToken, refreshToken },
    },
  };
}

export { signUp, signIn };
