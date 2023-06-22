import { response } from "../middleware/response.js";
import { deleteService, uploadService } from "../service/image.js";

export async function uploadController(req, res) {
  try {
    console.log(req.file);
    const resp = await uploadService(req.files);
    if (resp) return response("SUCCESS..!!", resp.data, 200, res);
    else return response("something went wrong..!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
export async function deleteController(req, res) {
  try {
    const resp = await deleteService(req.body.file);
    if (resp) return response("SUCCESS..!!", resp.data, 200, res);
    else return response("something went wrong..!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
