import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    families: [
      {
        type: Types.ObjectId,
        ref: "Family",
      },
    ],
    contributions: [
      {
        type: Types.ObjectId,
        ref: "Contribution",
      },
    ],
    goals: [
      {
        type: Types.ObjectId,
        ref: "Goal",
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
