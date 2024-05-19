import { Router } from "express";

const userRouter = Router();

// TODO DOCS

userRouter.post("/sign-up", async (req, res, next) => {
  res.json({ message: "SIGNUP" });
});
userRouter.post("/sign-in", async (req, res, next) => {
  res.json({ message: "SIGNIN" });
});

export default userRouter;
