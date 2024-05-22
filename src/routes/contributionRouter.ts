import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware";
import { createContribution,getGoalContributions } from "../controllers/contributionController";

const contributionRouter = Router();

// TODO DOCS

contributionRouter.post("/", protectRoute, createContribution);
contributionRouter.get("/goal/:goalId", protectRoute, getGoalContributions);


export default contributionRouter;
