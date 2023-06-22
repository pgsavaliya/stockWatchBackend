import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    mobile: {
      type: Number,
      trim: true,
    },
    // gender: {
    //   type: String,
    //   enum: ["male", "female"],
    // },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
  }
});

export const adminModel = model("admin", adminSchema);
