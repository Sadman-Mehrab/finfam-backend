"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserGoals = exports.createGoal = void 0;
const goalModel_1 = require("../models/goalModel");
const userModel_1 = require("../models/userModel");
const createGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, totalAmount } = req.body;
    // @ts-ignore
    const user = req.user;
    try {
        const goalDoc = yield goalModel_1.GoalModel.create({
            name: name,
            totalAmount: totalAmount,
            creator: user._id,
        });
        const goal = goalDoc.toObject();
        const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(user._id, {
            $addToSet: { goals: goal._id },
        });
        res.status(201).json(goal);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
exports.createGoal = createGoal;
const getUserGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = req.user;
    try {
        const goalDoc = yield goalModel_1.GoalModel.find({ creator: user._id });
        res.status(201).json(goalDoc);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
exports.getUserGoals = getUserGoals;
//# sourceMappingURL=goalController.js.map