import {
  addController,
  loginController,
} from "../../controller/admin/index.js";
import { Router } from "express";

const authRoute = Router();

authRoute.get("/", (req, res) => {
  res.status(200).json({ message: "aDmIn AuTh RoUtE iS wOrKiNg..!!" });
});

authRoute.post("/register", addController);
authRoute.post("/login", loginController);

export { authRoute };
