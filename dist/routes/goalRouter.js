"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const goalController_1 = require("../controllers/goalController");
const goalRouter = (0, express_1.Router)();
// TODO DOCS
goalRouter.post("/", authMiddleware_1.protectRoute, goalController_1.createGoal);
goalRouter.get("/", authMiddleware_1.protectRoute, goalController_1.getUserGoals);
exports.default = goalRouter;
//# sourceMappingURL=goalRouter.js.map