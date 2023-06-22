import { adminModel } from "../../../model/index.js";
import { save } from "../../../helper/index.js";
import config from "../../../config/config.js";
import { encrypt } from "../../../helper/index.js";
import jwt from "jsonwebtoken";
import bcryptJs from "bcryptjs";

export async function addService(data) {
  return new Promise(async (res, rej) => {
    try {
      if (data.email || data.mobile) {
        if (data.password) {
          const userData = await adminModel.find({ email: data.email });
          if (userData.length > 0) {
            rej({ status: 400, message: "email Already registerd" });
          } else {
            const saveData = await save(data, adminModel);
            if (saveData) res(saveData);
            else rej({ status: 500, message: "Something Went Worng!!" });
          }
        } else {
          rej({ status: 400, message: "Password Is Require!!" });
        }
      } else {
        rej({
          status: 400,
          message: "Email or mobileNumber Is Require!!",
        });
      }
    } catch (err) {
      console.log("err ...", err);
      rej({
        status: 500,
        error: err,
        message: err?.message || "Something Went Wrong!!!",
      });
    }
  });
}

export async function loginService(data) {
  return new Promise(async (res, rej) => {
    try {
      if (data) {
        let loginData = await adminModel.findOne({ email: data.email });
        if (loginData) {
          const isMatch = await bcryptJs.compare(
            data.password,
            loginData.password
          );
          if (isMatch) {
            let key1 = config.ADMIN_ENCRYPTION_KEY;
            let encryptAdmin = await encrypt(loginData._id, key1);
            let encryptPass = await encrypt(loginData.password, key1);
            let token = jwt.sign(
              {
                adminId: encryptAdmin,
                password: encryptPass,
              },
              config.ADMIN_ACCESS_TOKEN,
              { expiresIn: config.ADMIN_ACCESS_TIME }
            );
            let data = {
              token: token,
              first_name: loginData.firstName,
              last_name: loginData.lastName,
            };
            res({ status: 200, data: data });
          } else {
            rej({ status: 400, message: "Worng Email And Password" });
          }
        } else {
          rej({
            status: 400,
            message: "Admin not registerd regester first..!!",
          });
        }
      }
    } catch (err) {
      console.log("err ...", err);
      rej({
        status: 500,
        error: err,
        message: err?.message || "Something Went Wrong!!!",
      });
    }
  });
}
