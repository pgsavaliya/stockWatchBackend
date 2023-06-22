import { userModel } from "../../../model/index.js";
import {
  findByIdAndUpdate,
  findOneAndDelete,
  getAll,
  getById,
} from "../../../helper/index.js";

export async function getUserService(str, page, limit) {
  return new Promise(async (res, rej) => {
    try {
      let qry = {};
      if (str) {
        qry["$or"] = [
          { firstName: { $regex: str, $options: "i" } },
          { lastName: { $regex: str, $options: "i" } },
          { email: { $regex: str, $options: "i" } },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: { $toLong: "$mobile" } },
                regex: str,
              },
            },
          },
        ];
      }
      if (page && limit) {
        const userData = await getAll(qry, +page, +limit, userModel);
        if (userData.data.total_count) {
          res(userData);
        } else {
          rej({ status: 404, message: "Data Not Found!!" });
        }
      } else {
        rej({ status: 400, message: "Pagination is Require!!" });
      }
    } catch (err) {
      console.log("err", err);
      rej({ status: 500, error: err, message: "Something Went Worng!!!" });
    }
  });
}
export async function getUserByIdService(_id) {
  return new Promise(async (res, rej) => {
    try {
      let deletedData = await getById({ _id: _id }, userModel);
      if (deletedData.status == 200) {
        res(deletedData);
      } else {
        rej(deletedData);
      }
    } catch (err) {
      rej({ status: 500, error: err, message: "Something Went Worng" });
    }
  });
}
export async function updateUserService(_id, data) {
  return new Promise(async (res, rej) => {
    try {
      if (!data._id && !data.password) {
        let updatedData = await findByIdAndUpdate(_id, data, userModel);
        if (updatedData.status == 200) {
          res(updatedData);
        } else {
          rej(updatedData);
        }
      } else {
        rej({ status: 400, message: "UserId & password can not change" });
      }
    } catch (err) {
      rej({ status: 500, error: err, message: "Something Went Worng!!" });
    }
  });
}
export async function deleteUserService(_id) {
  return new Promise(async (res, rej) => {
    try {
      let deletedData = await findOneAndDelete({ _id: _id }, userModel);
      if (deletedData.status == 200) {
        res(deletedData);
      } else {
        rej(deletedData);
      }
    } catch (err) {
      rej({ status: 500, error: err, message: "Something Went Worng" });
    }
  });
}
