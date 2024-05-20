import { Router } from "express";
import { signin, signup } from "../controllers/userController";
import { protectRoute } from "../middlewares/authMiddleware";

const userRouter = Router();

// TODO DOCS

userRouter.post("/sign-up", signup);
userRouter.post("/sign-in", signin);


export default userRouter;
