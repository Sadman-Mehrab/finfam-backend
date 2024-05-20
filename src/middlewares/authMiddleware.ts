import express, { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "../config/config";

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  const [_, token] = authHeaders.split(" ");
  if (!token) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    // @ts-ignore
    req.user = payload;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not Authorized" });
  }
};
