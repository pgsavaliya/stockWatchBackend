import jwt from "jsonwebtoken";
import { decrypt } from "../helper/index.js";
import config from "../config/config.js";

export async function verifyUserToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({ success: false, message: "token missing" });
  } else {
    token = token.split(" ")[1];
    jwt.verify(token, config.USER_ACCESS_TOKEN, async (err, payload) => {
      if (err) {
        console.log(err);
        res.status(403).json({ success: false, message: "unauthorized token" });
      } else {
        req.userId = await decrypt(
          payload.userId,
          config.USER_ENCRYPTION_KEY
        );
        req.body.userId = await decrypt(
          payload.userId,
          config.USER_ENCRYPTION_KEY
        );
        req.password = await decrypt(
          payload?.password,
          config.USER_ENCRYPTION_KEY
        );
        next();
      }
    });
  }
}

export async function verifyAdminToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({ success: false, message: "token missing" });
  } else {
    token = token.split(" ")[1];

    jwt.verify(
      token,
      config.ADMIN_ACCESS_TOKEN,
      async (err, payload) => {
        if (err) {
          console.log(err);
          res
            .status(403)
            .json({ success: false, message: "unauthorized token" });
        } else {
          req.body.adminId = await decrypt(
            payload.adminId,
            config.ADMIN_ENCRYPTION_KEY
          );
          req.adminId = await decrypt(
            payload.adminId,
            config.ADMIN_ENCRYPTION_KEY
          );
          req.password = await decrypt(
            payload.password,
            config.ADMIN_ENCRYPTION_KEY
          );
          next();
        }
      }
    );
  }
}

export async function verifyDefaultUserToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    next();
  } else {
    token = token.split(" ")[1];
    jwt.verify(token, config.USER_ACCESS_TOKEN, async (err, payload) => {
      if (err) {
        console.log(err);
        res.status(403).json({ success: false, message: "unauthorized token" });
      } else {
        req.userId = await decrypt(
          payload.userId,
          config.USER_ENCRYPTION_KEY
        );
        req.password = await decrypt(
          payload.password,
          config.USER_ENCRYPTION_KEY
        );
        next();
      }
    });
  }
}
