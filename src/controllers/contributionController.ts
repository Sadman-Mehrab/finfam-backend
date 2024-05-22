import express, { NextFunction, Request, Response } from "express";
import { startSession } from 'mongoose';
import { ContributionModel } from "../models/contributionModel";
import { UserModel } from "../models/userModel";
import { GoalModel } from "../models/goalModel";

export const createContribution = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  const { amount, goalId } = req.body;

  const session = await startSession();
  session.startTransaction();

  try {

    const goalDoc = await GoalModel.findOne({ _id: goalId });
    if (!goalDoc) {
      return res.status(404).json({ message: "Goal not found" });
    }

    const contributions = await ContributionModel.find({ goal: goalId });
    // @ts-ignore
    const totalCompleted = contributions.reduce(
      (sum, contribution) => sum + contribution.amount,
      0
    );

    if (totalCompleted + amount > goalDoc.totalAmount) {
      return res.status(400).json({ message: "Contribution exceeds goal total amount" });
    }



    const contributionDoc = await ContributionModel.create([{
      contributor: user._id,
      goal: goalId,
      amount: amount,
    }], { session });

    const contribution = contributionDoc[0].toObject();

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
      $addToSet: { contributions: contribution._id },
    }, { session });

    const updatedGoal = await GoalModel.findByIdAndUpdate(goalId, {
      $addToSet: { contributors: user._id, contributions: contribution._id },
    }, { session });

    await session.commitTransaction();

    res.status(201).json(contribution);
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

export const getGoalContributions = async (req: Request, res: Response) => {
  const goalId = req.params.goalId;

  try {
    const contributionDoc = await ContributionModel.find({ goal: goalId });

    res.status(200).json(contributionDoc);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
