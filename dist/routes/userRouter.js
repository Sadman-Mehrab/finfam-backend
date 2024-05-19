"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
// TODO DOCS
userRouter.post("/sign-up", userController_1.signup);
userRouter.post("/sign-in", userController_1.signin);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map