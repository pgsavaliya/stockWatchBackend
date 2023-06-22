import { Schema, model } from "mongoose";

const investmentShareDataSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    open: {
      type: Number,
      trim: true,
    },
    high: {
      type: Number,
      trim: true,
    },
    low: {
      type: Number,
      trim: true,
    },
    volume: {
      type: Number,
      trim: true,
    },
    prevClose: {
      type: Number,
      trim: true,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const investmentShareDataModel = model(
  "investmentShareData",
  investmentShareDataSchema
);
