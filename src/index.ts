import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { config } from "./config/config";
import {
  userRouter,
  familyRouter,
  goalRouter,
  contributionRouter,
} from "./routes";

// setup
const app = express();
app.disable("etag");

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});
app.use("/api/users/", userRouter);
app.use("/api/families/", familyRouter);
app.use("/api/goals/", goalRouter);
app.use("/api/contributions/", contributionRouter);

// server startup
async function startServer() {
  try {
    await mongoose.connect(config.MONGO_URI);
    app.listen(config.PORT, () => {
      console.log(`Server Started on PORT: ${config.PORT}`);
    });
  } catch (error) {
    console.log("Database Connection Error:" + error);
  }
}

startServer();
