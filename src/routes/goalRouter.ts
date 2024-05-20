import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware";
import { createGoal, getUserGoals } from "../controllers/goalController";

const goalRouter = Router();

// TODO DOCS

goalRouter.post("/", protectRoute, createGoal);
goalRouter.get("/", protectRoute, getUserGoals);

export default goalRouter;
