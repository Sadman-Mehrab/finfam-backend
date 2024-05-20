import express, { NextFunction, Request, Response } from "express";
import { ContributionModel } from "../models/contributionModel";
import { UserModel } from "../models/userModel";

export const createContribution = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const { familyId } = req.params;
  // @ts-ignore
  const user = req.user;

  try {
    const contributionDoc = await ContributionModel.create({
      contributor: user._id,
      family: familyId,
      amount: amount,
    });
    const contribution = contributionDoc.toObject();

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
      $addToSet: { contributions: contribution._id },
    });

    res.status(201).json(contribution);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

