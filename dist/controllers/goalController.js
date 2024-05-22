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
exports.getGoalProgress = exports.getGoal = exports.getFamilyGoals = exports.getUserGoals = exports.createGoal = void 0;
const mongoose_1 = require("mongoose");
const goalModel_1 = require("../models/goalModel");
const userModel_1 = require("../models/userModel");
const familyModel_1 = require("../models/familyModel");
const contributionModel_1 = require("../models/contributionModel");
const createGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = req.user;
    const { name, totalAmount, familyId } = req.body;
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        const goalDoc = yield goalModel_1.GoalModel.create([
            {
                name: name,
                totalAmount: totalAmount,
                creator: user._id,
                family: familyId,
            },
        ], { session });
        const goal = goalDoc[0].toObject();
        const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(user._id, {
            $addToSet: { goals: goal._id },
        }, { session });
        const updatedFamily = yield familyModel_1.FamilyModel.findByIdAndUpdate(familyId, {
            $addToSet: { goals: goal._id },
        }, { session });
        yield session.commitTransaction();
        res.status(201).json(goal);
    }
    catch (error) {
        yield session.abortTransaction();
        console.error(error);
        res.status(400).json({ message: error.message });
    }
    finally {
        session.endSession();
    }
});
exports.createGoal = createGoal;
const getUserGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = req.user;
    try {
        const goalDoc = yield goalModel_1.GoalModel.find({ creator: user._id });
        res.status(200).json(goalDoc);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
exports.getUserGoals = getUserGoals;
const getFamilyGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const familyId = req.params.familyId;
    try {
        const goalDoc = yield goalModel_1.GoalModel.find({ family: familyId }).populate("contributors", "userName");
        res.status(200).json(goalDoc);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
exports.getFamilyGoals = getFamilyGoals;
const getGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const goalId = req.params.goalId;
    try {
        const goalDoc = yield goalModel_1.GoalModel.findOne({ _id: goalId })
            .populate("contributions")
            .populate("contributors", "userName");
        res.status(200).json(goalDoc);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});
exports.getGoal = getGoal;
const getGoalProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const goalId = req.params.goalId;
    try {
        const goalDoc = yield goalModel_1.GoalModel.findOne({ _id: goalId });
        if (!goalDoc) {
            return res.status(404).json({ message: "Goal not found" });
        }
        const contributions = yield contributionModel_1.ContributionModel.find({ goal: goalId });
        // @ts-ignore
        const totalCompleted = contributions.reduce((sum, contribution) => sum + contribution.amount, 0);
        res
            .status(200)
            .json({
            totalAmount: goalDoc.totalAmount,
            totalCompleted: totalCompleted,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
exports.getGoalProgress = getGoalProgress;
//# sourceMappingURL=goalController.js.map