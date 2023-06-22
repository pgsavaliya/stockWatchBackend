import {
  getRSIService,
  getUpdatedInvestmentDataService,
  getbBandService,
} from "../../service/user/index.js";
import { response } from "../../middleware/index.js";

export async function getRSIController(req, res) {
  try {
    const resp = await getRSIService(
      req.query.type,
      req.query.shareName,
      req.query.time
    );
    if (resp) return response("SUCCESS..!!", resp.data, resp.status, res);
    else return response("Something went wrong!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
export async function getbBandController(req, res) {
  try {
    const resp = await getbBandService(req.query.shareName);
    if (resp) return response("SUCCESS..!!", resp.data, resp.status, res);
    else return response("Something went wrong!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
export async function getUpdatedInvestmentDataController(req, res) {
  try {
    const resp = await getUpdatedInvestmentDataService(req.query.shareName);
    if (resp) return response("SUCCESS..!!", resp.data, resp.status, res);
    else return response("Something went wrong!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
