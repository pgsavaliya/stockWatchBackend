import { Schema, model } from "mongoose";

const shareScreenerSchema = new Schema(
  {
    shareName: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    target: {
      type: String,
      trim: true,
    },
    startsharePrice: {
      type: Number,
      trim: true,
    },
    currentsharePrice: {
      type: Number,
      trim: true,
    },
    achivePrice: {
      type: Number,
      trim: true,
    },
    stopLossPrice: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

export const shareScreenerModel = model("shareScreener", shareScreenerSchema);
