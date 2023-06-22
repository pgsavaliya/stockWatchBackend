import { Router } from "express";
import { getEarlyScreenerController } from "../../controller/user/index.js";

const screenerRoute = Router();

screenerRoute.get("/", (req, res) => {
  res.status(200).json({ message: "UsEr ScReEnEr RoUtE iS wOrKiNg..!!" });
});

screenerRoute.get("/getEarlyScreener", getEarlyScreenerController);

export { screenerRoute };
