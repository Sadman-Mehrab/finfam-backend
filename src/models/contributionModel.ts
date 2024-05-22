import { Schema, model, Types } from "mongoose";

const contributionSchema = new Schema(
  {
    contributor: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: {
      type: Types.ObjectId,
      ref: "Goal",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const ContributionModel = model("Contribution", contributionSchema);
