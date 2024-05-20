import express, { NextFunction, Request, Response } from "express";
import { GoalModel } from "../models/goalModel";
import { UserModel } from "../models/userModel";

export const createGoal = async (req: Request, res: Response) => {
  const { name, totalAmount } = req.body;
  // @ts-ignore
  const user = req.user;

  try {
    const goalDoc = await GoalModel.create({
      name: name,
      totalAmount: totalAmount,
      creator: user._id,
    });
    const goal = goalDoc.toObject();

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
      $addToSet: { goals: goal._id },
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getUserGoals = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  try {
    const goalDoc = await GoalModel.find({ creator: user._id });

    res.status(201).json(goalDoc);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
