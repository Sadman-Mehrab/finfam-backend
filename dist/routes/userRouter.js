"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userRouter = (0, express_1.Router)();
// TODO DOCS
userRouter.post("/sign-up", userController_1.signup);
userRouter.post("/sign-in", userController_1.signin);
userRouter.get("/:userId", userController_1.getPublicUserById);
userRouter.get("/currentUser", authMiddleware_1.protectRoute, userController_1.getCurrentUser);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map