import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware";
import { createContribution } from "../controllers/contributionController";

const contributionRouter = Router();

// TODO DOCS

contributionRouter.post("/goal/:goalId", protectRoute, createContribution);


export default contributionRouter;
