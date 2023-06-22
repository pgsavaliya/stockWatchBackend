import {
  getUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../../service/admin/index.js";
import { response } from "../../middleware/response.js";

export async function getUserController(req, res) {
  try {
    const resp = await getUserService(
      req.query.str,
      req.query.page,
      req.query.limit
    );
    if (resp) return response("SUCESS!!", resp.data, resp.status, res);
    else return response("Something Went Worng!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
export async function getUserByIdController(req, res) {
  try {
    const resp = await getUserByIdService(req.params._id);
    if (resp) return response("SUCESS!!", resp.data, resp.status, res);
    else return response("Something Went Worng!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
}
export async function updateUserController(req, res) {
  try {
    const resp = await updateUserService(req.params._id, req.body);
    if (resp) return response("SUCESS!!", resp.data, resp.status, res);
    else return response("Something Went Worng!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.err, err.status, res);
  }
}
export async function deleteUserController(req, res) {
  try {
    const resp = await deleteUserService(req.params._id);
    if (resp) return response("SUCESS!!", resp.data, resp.status, res);
    else return response("Something Went Worng!!", {}, 500, res);
  } catch (err) {
    return response(err.message, err?.err, err.status, res);
  }
}
