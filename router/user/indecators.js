import { Router } from "express";
import {
  getRSIController,
  getUpdatedInvestmentDataController,
  getbBandController,
} from "../../controller/user/index.js";

const indecatorsRoute = Router();

indecatorsRoute.get("/", (req, res) => {
  res.status(200).json({ message: "UsEr InDeCaToRs RoUtE iS wOrKiNg..!!" });
});

indecatorsRoute.get("/getRSI", getRSIController);
indecatorsRoute.get("/getbBand", getbBandController);
indecatorsRoute.get(
  "/getUpdatedInvestmentData",
  getUpdatedInvestmentDataController
);

export { indecatorsRoute };
