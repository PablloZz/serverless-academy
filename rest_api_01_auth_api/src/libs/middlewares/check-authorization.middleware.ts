import { type Request, type Response, type NextFunction } from "express";
import { StatusCode } from "@/enums/enums.js";
import { token } from "@/packages/token/token.js";

async function checkAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  const authToken = authHeader?.replace("Bearer ", "");

  if (!authToken) {
    res
      .status(StatusCode.UNAUTHORIZED)
      .json({ success: false, message: "Please, log in into your account" });
    return;
  }

  try {
    const user = await token.verifyToken<{ id: number; email: string }>(
      authToken as string
    );
    const { id, email } = user;
    req.user = { id, email };
    next();
  } catch (error) {
    res.status(StatusCode.FORBIDDEN).json({
      success: false,
      message: "You don't have access to this resource",
    });
    return;
  }
}

export { checkAuthorization };
