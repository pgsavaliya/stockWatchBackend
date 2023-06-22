import multer from "multer";
// import { URL } from "url";

import path from "path";
// const dirname = new URL(import.meta.url).pathname;
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
let storageMulter = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../upload"));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

export let upload = multer({ storage: storageMulter });
