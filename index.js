import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import v1 from "./router/v1.js";
import morgan from "morgan";
import config from "./config/config.js";
import fs from "fs";
import csv from "csv-parser";
import { save, addInvestmentData } from "./helper/index.js";
// Requiring the module
import reader from "xlsx";
// import { shareDataModel } from "./model/shareData.model.js";
import {
  investmentShareNameModel,
  investmentOptimisedIndecatersDataModel,
  investmentShareDataModel,
} from "./model/index.js";
// import {} from "./model/investmentData.model.js";
var results = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({ message: "InItIaL RoUtE fOr StOcK wAtCh ..!!" });
});

app.use("/v1", v1);
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 0,
  keepAlive: true,
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", async function () {
  console.log("Mongoose default connection open to " + config.MONGODB_URL);
  app.listen(config.PORT, async () => {
    console.log("SeRvEr StArTeD At : ", config.PORT);
    console.log("MoNgoDb CoNnEcTeD..!!");
    // let data = await investmentShareDataModel
    //   .find({ __v: 0 }, { name: 1 })
    //   .distinct("name");
    // console.log(data.length);
    // data.map(async (item) => {
    //   let pavandata = {};
    //   pavandata.name = item;
    //   // console.log(pavandata);
    //   let saveData = await save(pavandata, investmentShareNameModel);
    //   if (saveData) console.log("data Saved", saveData);
    //   else console.log("Pavan Data Not Saved...............");
    // });
    // generateFileName();
    // let shareName = await investmentShareNameModel.find();
    // investmentIndecators(shareName);
    // console.log(shareName);
  });
});
// If the connection throws an error
mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

// async function investmentIndecators(shareNames) {
//   if (shareNames.length > 0) {
//     for (let i = 0; i < shareNames.length; i++) {
//       // if (i == 1) {
//       //   break;
//       // }
//       await delay(10000);
//       console.log("Pg", shareNames.length);
//       let indicaterData = await addInvestmentData(shareNames[i].name);
//       // console.log(indicaterData);
//       indicaterData.map(async (item) => {
//         if (String(item.rsi) == "NaN") {
//           item.rsi = 0;
//         }
//         let saveData = await save(item, investmentOptimisedIndecatersDataModel);
//         if (saveData) console.log("data Saved", item);
//         else {
//           console.log("Pavan Data Not Saved...............", item);
//           exit;
//         }
//       });
//     }
//   }
// }
// fs.createReadStream("example.csv")
//   .pipe(csv({ headers: false }))
//   .on("data", (data) => results.push(Object.values(data)))
//   .on("end", async () => {
//     results.shift();
//     // await results.map(async (item) => {
//     //   await item.splice(5, 3);
//     // });
//     // await results.map(async (item) => {
//     //   await item.splice(6, 5);
//     // });
//     console.log(results);
//   });

// console.log(data);
// async function readtxtfile(fileName) {
//   return new Promise((res, rej) => {
//     fs.readFile(
//       "./data/Equity Data/2023/" + fileName,
//       "utf8",
//       async (err, data) => {
//         if (err) {
//           // console.error(err);
//           res("Data Not Found");
//         } else {
//           data = data.split("\r\n");
//           await data.map((item, index) => {
//             data[index] = item.split(",");
//           });
//           data.shift();
//           res(data);
//         }
//       }
//     );
//   });
// }
// async function generateFileName() {
//   return new Promise(async (res, rej) => {
//     let date = new Date("2023-03-31");
//     let i = 0;
//     while (true) {
//       if (+date.getFullYear() == 2024) {
//         break;
//       }
//       // console.log("Pavan");
//       let name;
//       if (date.getMonth() < 9 && date.getDate() < 10) {
//         name =
//           "2023-0" +
//           (date.getMonth() + 1) +
//           "-0" +
//           date.getDate() +
//           "-NSE-EQ.txt";
//       } else if (date.getMonth() < 9) {
//         name =
//           "2023-0" +
//           (date.getMonth() + 1) +
//           "-" +
//           date.getDate() +
//           "-NSE-EQ.txt";
//       } else if (date.getDate() < 10) {
//         name =
//           "2023-" +
//           (date.getMonth() + 1) +
//           "-0" +
//           date.getDate() +
//           "-NSE-EQ.txt";
//       } else {
//         name =
//           "2023-" +
//           (date.getMonth() + 1) +
//           "-" +
//           date.getDate() +
//           "-NSE-EQ.txt";
//       }
//       console.log(name);
//       // let name = "2019-12-31-NSE-EQ.txt";
//       let data = await readtxtfile(name);
//       // console.log("data", data);q
//       if (data != "Data Not Found") {
//         // for (let a = 0; a < data.length; a++) {
//         // await data.map(async (item, index) => {
//         for (let e = 0; e < data.length; e++) {
//           let pavanData = data[e];
//           if (pavanData.length > 5) {
//             let data1 = {};
//             data1.name = pavanData[0];
//             // console.log("Pavan.............");
//             if (String(pavanData[2]) == "-") continue;
//             else data1.open = +pavanData[2];

//             if (String(pavanData[3]) == "-") continue;
//             else data1.high = +pavanData[3];

//             if (String(pavanData[4]) == "-") continue;
//             else data1.low = +pavanData[4];

//             if (String(pavanData[6]) == "-") continue;
//             else data1.volume = +pavanData[6];

//             if (String(pavanData[5]) == "-") continue;
//             else data1.prevClose = +pavanData[5];
//             // let pavandate = pavanData[1].match(/.{1,4}/g) ?? [];
//             // let pavanmonth = pavandate[1].match(/.{1,2}/g) ?? [];
//             // let pavanfinelDate = new Date(
//             //   pavandate[0] + "-" + pavanmonth[0] + "-" + pavanmonth[1]
//             // );
//             // let stringDate =
//             let pavanfdate = pavanData[1].split("-");
//             if (pavanfdate[1] < 10) pavanfdate[1] = 0 + pavanfdate[1];
//             if (pavanfdate[2] < 10) pavanfdate[2] = 0 + pavanfdate[2];
//             let pavanfinelDate = new Date(
//               pavanfdate[0] + "-" + pavanfdate[1] + "-" + pavanfdate[2]
//             );
//             // console.log(pavanfinelDate);
//             // console.log("Pavan ", pavanfinelDate);
//             data1.date = pavanfinelDate;
//             // console.log(data1);
//             // break;
//             // console.log("data1.", data1);
//             let saveData = save(data1, investmentShareDataModel);
//             // if (saveData) console.log("data Saved", index);
//             // else console.log("Pavan Data Not Saved...............", data1);
//           }
//         }
//         // });
//         // await delay(2);
//       }
//       await delay(12000);

//       date = new Date(date.setDate(date.getDate() + 1));
//       console.log(date);
//     }
//   });
// }
function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

//********************************************** */
//other data
// let data = mongoose.shareDataModel.find();
// console.log(data);
// let data = await shareDataModel
//   .find({ __v: 0 }, { name: 1 })
//   .distinct("name");
// console.log(data.length);
// data.map(async (item) => {
//   let pavandata = {};
//   pavandata.name = item;
//   // console.log(pavandata);
//   let saveData = await save(pavandata, investmentShareNameModel);
//   if (saveData) console.log("data Saved", saveData);
//   else console.log("Pavan Data Not Saved...............");
// });
// , function (err, docs) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("First function call : ", docs);
//   }
// });
// generateFileName();
// let data = await readtxtfile("2001-01-01-NSE-EQ.txt");
// console.log(data);
//

// Reading our test file
// const file = reader.readFile("./Historical Stock data.xlsx");

// let data = [];

// const sheets = file.SheetNames;

// for (let i = 2; i < 3; i++) {
//   const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
//   temp.forEach(async (res) => {
//     data.push(res);
//   });
// }

// Printing data
// data.shift();
// data.map(async (item, index) => {
//   item.date = new Date((item.Date - (25567 + 2)) * 86400 * 1000);
//   (item.name = "AxisBank"),
//     (item.open = item.Open),
//     (item.high = item.High),
//     (item.low = item.Low),
//     (item.prevClose = item.Close);
//   console.log(item);
//   // (item.date = new Date(item.Date));
//   const saveData = await save(item, shareDataModel);
//   if (saveData) console.log("data saved");
//   else rej({ status: 500, message: "Something Went Wrong..!!" });
// });
