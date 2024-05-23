"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const familyController_1 = require("../controllers/familyController");
const familyRouter = (0, express_1.Router)();
// TODO DOCS
familyRouter.post("/", authMiddleware_1.protectRoute, familyController_1.createFamily);
familyRouter.get("/", authMiddleware_1.protectRoute, familyController_1.getUserFamilies);
familyRouter.get("/:familyId", authMiddleware_1.protectRoute, familyController_1.getFamily);
familyRouter.delete("/:familyId", authMiddleware_1.protectRoute, familyController_1.deleteFamily);
familyRouter.patch("/join/:familyId", authMiddleware_1.protectRoute, familyController_1.addMemberToFamily);
familyRouter.patch("/kick/:familyId", authMiddleware_1.protectRoute, familyController_1.kickMemberFromFamily);
familyRouter.patch("/leave/:familyId", authMiddleware_1.protectRoute, familyController_1.leaveFamily);
exports.default = familyRouter;
//# sourceMappingURL=familyRouter.js.map