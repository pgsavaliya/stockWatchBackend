import { Router } from "express";
const adminRoute = Router();

import { authRoute } from "./auth.js";
import { userManageRoute } from "./userManage.js";

adminRoute.get("/", (req, res) => {
  res.status(200).json({ message: "aDmIn RoUtE iS wOkInG..!!" });
});

adminRoute.use("/auth", authRoute);
adminRoute.use("/userManage", userManageRoute);

export { adminRoute };
