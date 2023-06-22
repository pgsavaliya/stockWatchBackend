import {
  getInvestmentShareNamesService,
  getInvestmentOptimisedDataService,
  getInvestmentDataService,
} from "../../service/user/index.js";
import { response } from "../../middleware/index.js";

export async function getInvestmentDataController(req, res) {
  try {
    const resp = await getInvestmentDataService(req.query.shareName);
    if (resp) return response("SUCCESS..!!", resp.data, resp.status, res);
    else return response("Something went wrong!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
export async function getInvestmentOptimisedDataController(req, res) {
  try {
    const resp = await getInvestmentOptimisedDataService(req.query.shareName);
    if (resp) return response("SUCCESS..!!", resp.data, resp.status, res);
    else return response("Something went wrong!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
export async function getInvestmentShareNamesController(req, res) {
  try {
    const resp = await getInvestmentShareNamesService();
    if (resp) return response("SUCCESS..!!", resp.data, resp.status, res);
    else return response("Something went wrong!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
