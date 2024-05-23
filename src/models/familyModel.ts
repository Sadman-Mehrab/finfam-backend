import { Schema, model, Types } from "mongoose";

const familySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
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

export const FamilyModel = model("Family", familySchema);
