import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware";
import { createFamily, getUserFamilies } from "../controllers/familyController";

const familyRouter = Router();

// TODO DOCS

familyRouter.post("/", protectRoute, createFamily);
familyRouter.get("/", protectRoute, getUserFamilies);

export default familyRouter;
