import express, { NextFunction, Request, Response } from "express";
import { startSession } from "mongoose";
import { FamilyModel, UserModel } from "../models/";

export const createFamily = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  const { name } = req.body;

  const session = await startSession();
  session.startTransaction();

  try {
    const familyDoc = await FamilyModel.create(
      [
        {
          name: name,
          creator: user._id,
        },
      ],
      { session }
    );

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
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

export const leaveFamily = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;
  const familyId = req.params.familyId;

  const session = await startSession();
  session.startTransaction();

  try {
    const family = await FamilyModel.findById(familyId);

    const updatedFamily = await FamilyModel.findByIdAndUpdate(
      familyId,
      { $pull: { members: user._id } },
      { new: true, session }
    );

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $pull: { families: familyId } },
      { new: true, session }
    );

    await session.commitTransaction();

    res.status(200).json({ message: "Left family successfully" });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

export const kickMemberFromFamily = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;
  const familyId = req.params.familyId;
  const { memberUserName } = req.body;

  const session = await startSession();
  session.startTransaction();

  try {
    const family = await FamilyModel.findById(familyId);

    const memberToKick = await UserModel.findOne({ userName: memberUserName });

    const updatedFamily = await FamilyModel.findByIdAndUpdate(
      familyId,
      { $pull: { members: memberToKick._id } },
      { new: true, session }
    );

    const updatedUser = await UserModel.findByIdAndUpdate(
      memberToKick._id,
      { $pull: { families: familyId } },
      { new: true, session }
    );

    await session.commitTransaction();

    res.status(200).json({ message: "Member kicked successfully" });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

export const deleteFamily = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;
  const familyId = req.params.familyId;

  try {
    const family = await FamilyModel.findById(familyId);

    await FamilyModel.findByIdAndDelete(familyId);
    res.status(200).json({ message: "Family deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
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
    console.log(error);
    res.status(500).json({ message: error.message });
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
    console.log(error);
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
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};
