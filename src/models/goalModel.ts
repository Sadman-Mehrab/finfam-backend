import { Schema, model, Types } from "mongoose";

const goalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    family: {
      type: Types.ObjectId,
      ref: "Family",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    contributions: [
      {
        type: Types.ObjectId,
        ref: "Contribution",
      },
    ],
    contributors: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const GoalModel = model("Goal", goalSchema);
