import express, { NextFunction, Request, Response } from "express";
import {
  comparePasswords,
  generateJWT,
  hashPassword,
} from "../services/authService";
import { UserModel } from "../models/userModel";

export const signup = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    const userDoc: any = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    });
    const { password, ...user } = userDoc.toObject();

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  try {
    const userDoc: any = await UserModel.findOne({ userName: userName });
    const user = userDoc.toObject();
    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const generatedToken = await generateJWT(user);
    const response = { access_token: generatedToken, userName: userName };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "User Not Found" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;

  try {
    const userDoc: any = await UserModel.findOne({ _id: user._id });
    const { password, ...response } = userDoc.toObject();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "User Not Found" });
  }
};

export const getPublicUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const userDoc: any = await UserModel.findOne({ _id: userId });
    const user = userDoc.toObject();

    res.status(200).json({userName: user.userName});
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "User Not Found" });
  }
};
