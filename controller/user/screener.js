import { getEarlyScreenerService } from "../../service/user/index.js";
import { response } from "../../middleware/index.js";

export async function getEarlyScreenerController(req, res) {
  try {
    const resp = await getEarlyScreenerService();
    if (resp) return response("SUCCESS..!!", resp.data, resp.status, res);
    else return response("Something went wrong!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
