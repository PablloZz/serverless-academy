import jwt, { type JwtPayload } from "jsonwebtoken";
import { type TConfig } from "@/packages/config/config.js";

class Token {
  private secret: string;

  private expirationTime: string | number;

  public constructor(config: TConfig) {
    this.secret = config.JWT_SECRET;
    this.expirationTime = config.ACCESS_TOKEN_TTL;
  }

  public createAccessToken<T extends Record<string, unknown>>(
    payload: T
  ): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expirationTime,
    });
  }

  public createRefreshToken<T extends Record<string, unknown>>(
    payload: T
  ): string {
    return jwt.sign(payload, this.secret);
  }

  public async verifyToken<T>(token: string): Promise<JwtPayload & T> {
    const tokenPayload = await jwt.verify(token, this.secret);

    return tokenPayload as JwtPayload & T;
  }
}

export { Token };
