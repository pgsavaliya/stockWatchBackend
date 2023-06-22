import { Router } from "express";
const userRoute = Router();
import {
  verifyUserToken,
  verifyDefaultUserToken,
} from "../../middleware/verifyToken.js";

import { authRoute } from "./auth.js";
import { indecatorsRoute } from "./indecators.js";
import { screenerRoute } from "./screener.js";
import { investmentRoute } from "./investment.js";

userRoute.get("/", (req, res) => {
  res.status(200).json({ message: "UsEr RoUtE iS wOkInG..!!" });
});

userRoute.use("/auth", authRoute);
userRoute.use("/indecators", indecatorsRoute);
userRoute.use("/screener", screenerRoute);
userRoute.use("/investment", investmentRoute);

export { userRoute };
