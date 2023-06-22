import { Schema, model } from "mongoose";

const investmentOptimisedIndecatersDataSchema = new Schema(
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
    close: {
      type: Number,
      trim: true,
    },
    volume: {
      type: Number,
      trim: true,
    },
    middleBand: {
      type: Number,
      trim: true,
    },
    upperBand: {
      type: Number,
      trim: true,
    },
    lowerBand: {
      type: Number,
      trim: true,
    },
    rsi: {
      type: Number,
      trim: true,
    },
    candleColor: {
      type: String,
      enum: ["green", "red"],
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const investmentOptimisedIndecatersDataModel = model(
  "investmentOptimisedIndecatersData",
  investmentOptimisedIndecatersDataSchema
);
