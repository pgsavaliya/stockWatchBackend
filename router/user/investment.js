import { Router } from "express";
import {
  getInvestmentShareNamesController,
  getInvestmentOptimisedDataController,
  getInvestmentDataController,
} from "../../controller/user/index.js";

const investmentRoute = Router();

investmentRoute.get("/", (req, res) => {
  res.status(200).json({ message: "UsEr investment RoUtE iS wOrKiNg..!!" });
});

investmentRoute.get("/getInvestmentData", getInvestmentDataController);
investmentRoute.get(
  "/getInvestmentOptimisedData",
  getInvestmentOptimisedDataController
);
investmentRoute.get(
  "/getInvestmentShareNames",
  getInvestmentShareNamesController
);

export { investmentRoute };
