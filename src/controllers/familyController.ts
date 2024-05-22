import express, { NextFunction, Request, Response } from "express";
import { startSession } from "mongoose";
import { FamilyModel } from "../models/familyModel";
import { UserModel } from "../models/userModel";

export const createFamily = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  const { name } = req.body;

  const session = await startSession();
  session.startTransaction();

  try {
    const familyDoc = await FamilyModel.create([{ name: name }], { session });
    const family = familyDoc[0].toObject();

    const response = await FamilyModel.findByIdAndUpdate(
      family._id,
      { $addToSet: { members: user._id } },
      { new: true, session }
    );

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { families: family._id },
      },
      { session }
    );

    await session.commitTransaction();

    res.status(201).json(response);
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

export const getUserFamilies = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  try {
    const familyDoc = await FamilyModel.find({ members: user._id }).populate(
      "members",
      "userName"
    );

    res.status(200).json(familyDoc);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getFamily = async (req: Request, res: Response) => {
  const familyId = req.params.familyId;
  try {
    const familyDoc = await FamilyModel.findOne({ _id: familyId }).populate(
      "members",
      "userName"
    );

    res.status(200).json(familyDoc);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const addMemberToFamily = async (req: Request, res: Response) => {
  const familyId = req.params.familyId;
  const { memberUserName } = req.body;

  const session = await startSession();
  session.startTransaction();

  try {
    const memberUser = await UserModel.findOne({ userName: memberUserName });
    const response = await FamilyModel.findByIdAndUpdate(
      familyId,
      { $addToSet: { members: memberUser._id } },
      { new: true, session }
    );

    const updatedUser = await UserModel.findByIdAndUpdate(
      memberUser._id,
      {
        $addToSet: { families: familyId },
      },
      { session }
    );

    await session.commitTransaction();

    res.status(200).json(response);
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};
