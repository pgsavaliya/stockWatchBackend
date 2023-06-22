import {
  getUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../../controller/admin/index.js";
import { verifyAdminToken } from "../../middleware/verifyToken.js";

import { Router } from "express";

const userManageRoute = Router();

userManageRoute.get("/", (req, res) => {
  res.status(200).json({ message: "aDmIn UsErMaNaGe RoUtE iS wOrKiNg..!!" });
});

userManageRoute.get("/getAll", verifyAdminToken, getUserController);
userManageRoute.get("/byId/:_id", verifyAdminToken, getUserByIdController);
userManageRoute.put("/update/:_id", verifyAdminToken, updateUserController);
userManageRoute.put("/delete/:_id", verifyAdminToken, deleteUserController);

export { userManageRoute };
