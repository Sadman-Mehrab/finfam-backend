import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware";
import {
  addMemberToFamily,
  createFamily,
  getUserFamilies,
  getFamily
} from "../controllers/familyController";

const familyRouter = Router();

// TODO DOCS

familyRouter.post("/", protectRoute, createFamily);
familyRouter.get("/", protectRoute, getUserFamilies);
familyRouter.get("/:familyId", protectRoute, getFamily);
familyRouter.patch("/join/:familyId", protectRoute, addMemberToFamily);

export default familyRouter;
