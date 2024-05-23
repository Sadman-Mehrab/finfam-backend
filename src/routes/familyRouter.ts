import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware";
import {
  addMemberToFamily,
  createFamily,
  getUserFamilies,
  getFamily,
  deleteFamily,
  leaveFamily,
  kickMemberFromFamily
} from "../controllers/familyController";

const familyRouter = Router();

// TODO DOCS

familyRouter.post("/", protectRoute, createFamily);
familyRouter.get("/", protectRoute, getUserFamilies);
familyRouter.get("/:familyId", protectRoute, getFamily);
familyRouter.delete("/:familyId", protectRoute, deleteFamily);
familyRouter.patch("/join/:familyId", protectRoute, addMemberToFamily);
familyRouter.patch("/kick/:familyId", protectRoute, kickMemberFromFamily);
familyRouter.patch("/leave/:familyId", protectRoute, leaveFamily);


export default familyRouter;
