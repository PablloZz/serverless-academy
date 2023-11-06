import express from "express";
import { signUp, signIn } from "./auth.service.js";

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  const signedUpUserInfo = await signUp(req);
  return res.status(signedUpUserInfo.status as number).json(signedUpUserInfo.data);
});

router.post("/sign-in", async (req, res) => {
  const signedInUserInfo = await signIn(req);
  return res.status(signedInUserInfo.status as number).json(signedInUserInfo.data);
});

export { router as authRouter };
