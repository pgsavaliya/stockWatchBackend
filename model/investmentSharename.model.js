import { Schema, model } from "mongoose";

const investmentShareNameSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const investmentShareNameModel = model(
  "investmentShareName",
  investmentShareNameSchema
);
