import express, { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { startSession } from "mongoose";
import {
  UserModel,
  FamilyModel,
  ContributionModel,
  GoalModel,
} from "../models/";

export const createGoal = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  const { name, totalAmount, familyId } = req.body;

  const session = await startSession();
  session.startTransaction();

  try {
    const goalDoc = await GoalModel.create(
      [
        {
          name: name,
          totalAmount: totalAmount,
          creator: user._id,
          family: familyId,
        },
      ],
      { session }
    );

    const goal = goalDoc[0].toObject();

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { goals: goal._id },
      },
      { session }
    );

    const updatedFamily = await FamilyModel.findByIdAndUpdate(
      familyId,
      {
        $addToSet: { goals: goal._id },
      },
      { session }
    );

    await session.commitTransaction();

    res.status(201).json(goal);
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

export const deleteGoal = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;
  const goalId = req.params.goalId;

  try {
    const goal = await GoalModel.findById(goalId);

    await GoalModel.findByIdAndDelete(goalId);

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserGoals = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  try {
    const goalDoc = await GoalModel.find({ creator: user._id });

    res.status(200).json(goalDoc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getFamilyGoals = async (req: Request, res: Response) => {
  const familyId = req.params.familyId;

  try {
    const goalDoc = await GoalModel.find({ family: familyId }).populate(
      "contributors",
      "userName"
    );

    res.status(200).json(goalDoc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getGoal = async (req: Request, res: Response) => {
  const goalId = req.params.goalId;
  try {
    const goalDoc = await GoalModel.findOne({ _id: goalId })
      .populate("contributions")
      .populate("contributors", "userName");

    res.status(200).json(goalDoc);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getGoalProgress = async (req: Request, res: Response) => {
  const goalId = req.params.goalId;

  try {
    const goalDoc = await GoalModel.findOne({ _id: goalId });

    const contributions = await ContributionModel.find({ goal: goalId });
    // @ts-ignore
    const totalCompleted = contributions.reduce(
      (sum, contribution) => sum + contribution.amount,
      0
    );

    res.status(200).json({
      totalAmount: goalDoc.totalAmount,
      totalCompleted: totalCompleted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
