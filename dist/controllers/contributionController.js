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
exports.getGoalContributions = exports.createContribution = void 0;
const mongoose_1 = require("mongoose");
const contributionModel_1 = require("../models/contributionModel");
const userModel_1 = require("../models/userModel");
const goalModel_1 = require("../models/goalModel");
const createContribution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = req.user;
    const { amount, goalId } = req.body;
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        const goalDoc = yield goalModel_1.GoalModel.findOne({ _id: goalId });
        if (!goalDoc) {
            return res.status(404).json({ message: "Goal not found" });
        }
        const contributions = yield contributionModel_1.ContributionModel.find({ goal: goalId });
        // @ts-ignore
        const totalCompleted = contributions.reduce((sum, contribution) => sum + contribution.amount, 0);
        if (totalCompleted + amount > goalDoc.totalAmount) {
            return res.status(400).json({ message: "Contribution exceeds goal total amount" });
        }
        const contributionDoc = yield contributionModel_1.ContributionModel.create([{
                contributor: user._id,
                goal: goalId,
                amount: amount,
            }], { session });
        const contribution = contributionDoc[0].toObject();
        const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(user._id, {
            $addToSet: { contributions: contribution._id },
        }, { session });
        const updatedGoal = yield goalModel_1.GoalModel.findByIdAndUpdate(goalId, {
            $addToSet: { contributors: user._id, contributions: contribution._id },
        }, { session });
        yield session.commitTransaction();
        res.status(201).json(contribution);
    }
    catch (error) {
        yield session.abortTransaction();
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    finally {
        session.endSession();
    }
});
exports.createContribution = createContribution;
const getGoalContributions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const goalId = req.params.goalId;
    try {
        const contributionDoc = yield contributionModel_1.ContributionModel.find({ goal: goalId });
        res.status(200).json(contributionDoc);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.getGoalContributions = getGoalContributions;
//# sourceMappingURL=contributionController.js.map