import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware";
import { createGoal, getUserGoals,getFamilyGoals, getGoalProgress, getGoal } from "../controllers/goalController";

const goalRouter = Router();

// TODO DOCS

goalRouter.post("/", protectRoute, createGoal);
goalRouter.get("/", protectRoute, getUserGoals);
goalRouter.get("/:goalId", protectRoute, getGoal);
goalRouter.get("/progress/:goalId", protectRoute, getGoalProgress);
goalRouter.get("/family/:familyId", protectRoute, getFamilyGoals);

export default goalRouter;
