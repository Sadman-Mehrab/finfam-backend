"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const goalController_1 = require("../controllers/goalController");
const goalRouter = (0, express_1.Router)();
// TODO DOCS
goalRouter.post("/", authMiddleware_1.protectRoute, goalController_1.createGoal);
goalRouter.get("/", authMiddleware_1.protectRoute, goalController_1.getUserGoals);
goalRouter.get("/:goalId", authMiddleware_1.protectRoute, goalController_1.getGoal);
goalRouter.delete("/:goalId", authMiddleware_1.protectRoute, goalController_1.deleteGoal);
goalRouter.get("/progress/:goalId", authMiddleware_1.protectRoute, goalController_1.getGoalProgress);
goalRouter.get("/family/:familyId", authMiddleware_1.protectRoute, goalController_1.getFamilyGoals);
exports.default = goalRouter;
//# sourceMappingURL=goalRouter.js.map