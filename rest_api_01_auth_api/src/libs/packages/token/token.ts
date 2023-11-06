import { Token } from "./token.package.js";
import { getEnv } from "@/packages/config/config.js";

const token = new Token(getEnv());

export { token };
