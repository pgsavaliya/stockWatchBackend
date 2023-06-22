import { userModel } from "../../../model/index.js";
import { save } from "../../../helper/index.js";
import config from "../../../config/config.js";
import { encrypt } from "../../../helper/index.js";
import jwt from "jsonwebtoken";
import bcryptJs from "bcryptjs";

export async function addService(data) {
  return new Promise(async (res, rej) => {
    try {
      if (data.email || data.password) {
        const userData = await userModel.findOne({ email: data.email });
        if (userData) {
          rej({ status: 400, message: "email Already registered..!!" });
        } else {
          data.displayName = data.firstName;
          const saveData = await save(data, userModel);
          if (saveData) res(saveData);
          else rej({ status: 500, message: "Something Went Wrong..!!" });
        }
      } else {
        rej({
          status: 400,
          message: "Email or mobile number or Password is require..!!",
        });
      }
    } catch (err) {
      console.log("err ...", err);
      rej({
        status: 500,
        error: err,
        message: err?.message || "Something Went Wrong..!!!",
      });
    }
  });
}

export async function loginService(data) {
  return new Promise(async (res, rej) => {
    try {
      if (data) {
        let loginData = await userModel.findOne({ email: data.email });
        if (loginData) {
          const isMatch = await bcryptJs.compare(
            data.password,
            loginData.password
          );
          if (isMatch) {
            let key1 = config.USER_ENCRYPTION_KEY;
            let encryptUser = await encrypt(loginData._id, key1);
            let encryptPass = await encrypt(loginData.password, key1);
            let token = jwt.sign(
              {
                userId: encryptUser,
                password: encryptPass,
              },
              config.USER_ACCESS_TOKEN,
              { expiresIn: config.USER_ACCESS_TIME }
            );
            let data1 = {
              token: token,
              first_name: loginData.firstName,
              last_name: loginData.lastName,
            };
            res({ status: 200, data: data1 });
          } else {
            rej({ status: 400, message: "Wrong Email And Password..!!" });
          }
        } else {
          rej({
            status: 400,
            message: "User not registerd regester first..!!",
          });
        }
      } else {
        rej({ status: 400, message: "enter valid data..!!" });
      }
    } catch (err) {
      console.log("err ...", err);
      rej({
        status: 500,
        error: err,
        message: err?.message || "Something Went Wrong..!!",
      });
    }
  });
}
