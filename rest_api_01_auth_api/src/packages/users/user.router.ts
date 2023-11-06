import express from "express";
import { StatusCode } from "@/enums/enums.js";
import { checkAuthorization } from "@/middlewares/middlewares.js";

const router = express.Router();

router.get("/me", checkAuthorization, async (req, res) => {
  res.status(StatusCode.OK).json({ success: true, data: req.user });
});

export { router as userRouter };
