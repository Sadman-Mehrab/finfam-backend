import express, { NextFunction, Request, Response } from "express";
import { FamilyModel } from "../models/familyModel";
import { UserModel } from "../models/userModel";

export const createFamily = async (req: Request, res: Response) => {
  const { name } = req.body;
  // @ts-ignore
  const user = req.user;

  try {
    const familyDoc = await FamilyModel.create({ name: name });
    const family = familyDoc.toObject();

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
      $addToSet: { families: family._id },
    });

    const response = await FamilyModel.findByIdAndUpdate(
      family._id,
      { $addToSet: { members: user._id } },
      { new: true }
    );

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getUserFamilies = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  try {
    const familyDoc = await FamilyModel.find({ members: user._id });

    res.status(201).json(familyDoc);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
