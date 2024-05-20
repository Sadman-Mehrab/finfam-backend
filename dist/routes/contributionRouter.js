"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const contributionController_1 = require("../controllers/contributionController");
const contributionRouter = (0, express_1.Router)();
// TODO DOCS
contributionRouter.post("/goal/:goalId", authMiddleware_1.protectRoute, contributionController_1.createContribution);
exports.default = contributionRouter;
//# sourceMappingURL=contributionRouter.js.map