import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";
import { config } from "./config/config";

// setup
const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/",  (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});
app.use("/api/users/", userRouter);

// TODO: Refactoring Server Startup
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
