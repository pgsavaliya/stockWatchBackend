import { addService, loginService } from "../../service/admin/index.js";
import { response } from "../../middleware/response.js";

export async function addController(req, res) {
  try {
    const resp = await addService(req.body);
    if (resp) return response("SUCCESS..!!", resp.data, resp.status, res);
    else return response("Something went wrong!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}

export async function loginController(req, res) {
  try {
    const resp = await loginService(req.body);
    if (resp) return response("SUCCESS..!!", resp.data, resp.status, res);
    else return response("Somthing Went Wrorng!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
