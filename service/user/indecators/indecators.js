import { shareDataModel } from "../../../model/index.js";
import { investmentOptimisedIndecatersDataModel } from "../../../model/investmentOptimisedIndecatersDataModel.model.js";

export async function getRSIService(type, shareName, time) {
  return new Promise(async (res, rej) => {
    try {
      if ((type, shareName)) {
        let date = new Date();
        if (type == "intraday") {
          if (time) {
            date.setMinutes(date.getMinutes() - time);
          } else {
            rej({
              status: 400,
              message: "Time is require in intraday type..!!",
            });
          }
        } else {
          date.setDate(date.getDate() - 13);
        }
        const shareData = await shareDataModel
          .find({
            name: shareName,
            // date: { $gte: date },
          })
          .sort({ date: 1 })
          //   .limit(13)
          .lean();

        if (shareData.length > 0) {
          // console.log(shareData.length);
          let shareDatalength = shareData.length;
          for (let i = 0; i < shareDatalength; i++) {
            if (shareData.length > 13) {
              shareData.shift();
            }
          }
          // console.log(shareData.length);

          let totalGain, totalLoss;
          //set gain or loss and count total gain and loss
          for (let i = 0; i < shareData.length - 1; i++) {
            shareData[i].change = shareData[i].open - shareData[i].prevClose;
            if (shareData[i].change > 0) {
              shareData[i].gain = shareData[i].change;
              totalGain = shareData[i].gain;
            } else {
              shareData[i].loss = shareData[i].change * -1;
              totalLoss = shareData[i].loss;
            }
          }
          //convert total loss negative to positive
          //   totalLoss = totalLoss * -1;

          //find average gain
          shareData[shareData.length - 1].avgGain =
            totalGain / (shareData.length - 1);
          shareData[shareData.length - 1].avgloss =
            totalLoss / (shareData.length - 1);

          //find rs
          shareData[shareData.length - 1].rs =
            shareData[shareData.length - 1].avgGain /
            shareData[shareData.length - 1].avgloss;

          //find rsi
          shareData[shareData.length - 1].rsi =
            100 - 100 / (1 + shareData[shareData.length - 1].rs);
          res({ status: 200, data: shareData });
        } else {
          rej({
            status: 404,
            message: "Share data not found please check share name again..!!",
          });
        }
      } else {
        rej({
          status: 400,
          message: "Type and shareName is require..!!",
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

export async function getbBandService(shareName) {
  return new Promise(async (res, rej) => {
    try {
      if (shareName && shareName != null) {
        let shareData = await shareDataModel
          .find({
            name: shareName,
            // date: { $gte: date },
          })
          .sort({ date: 1 })
          //   .limit(13)
          .lean();
        let shareDatalength = shareData.length;
        if (shareData.length > 0) {
          for (let i = 0; i < shareDatalength; i++) {
            if (shareData.length > 60) {
              shareData.shift();
            }
          }
          console.log(shareData.length);
          let shareData1 = [];
          for (let q = 0; shareData.length >= 30; q++) {
            let min = 0,
              totalclose = 0,
              totalvalue2 = 0;
            // shareData.map((item,index) => {
            for (let w = 0; w <= 29; w++) {
              totalclose = totalclose + shareData[w].prevClose;
            }
            // });
            min = totalclose / 30;
            // shareData.map((item) => {
            for (let w = 0; w <= 29; w++) {
              shareData[w].value = shareData[w].prevClose - min;
              shareData[w].value2 = shareData[w].value * shareData[w].value;
              totalvalue2 = totalvalue2 + shareData[w].value2;
            }
            // });
            let s = totalvalue2 / 30;
            s = Math.sqrt(s);
            let middleBand = min,
              upperBand,
              lowerBand;
            upperBand = middleBand + s * 2;
            lowerBand = middleBand - s * 2;
            let data = {
              min: min,
              s: s,
              totalvalue2: totalvalue2,
              middleBand: middleBand,
              upperBand: upperBand,
              lowerBand: lowerBand,
              shareData: shareData[29],
            };
            // console.log(data);
            shareData1.push(data);
            shareData.shift();
            // res({
            //   status: 200,
            //   data: {
            //     min: min,
            //     s: s,
            //     totalvalue2: totalvalue2,
            //     middleBand: middleBand,
            //     upperBand: upperBand,
            //     lowerBand: lowerBand,
            //     shareData: shareData,
            //   },
            // });
          }
          res({
            status: 200,
            data: shareData1,
          });
        } else {
          rej({ status: 400, message: "ShareData not Foumd" });
        }
      } else {
        rej({
          status: 400,
          message: "ShareName is require..!!",
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

export async function getUpdatedInvestmentDataService(shareName) {
  return new Promise(async (res, rej) => {
    try {
      if (shareName && shareName != null) {
        let shareData = await investmentOptimisedIndecatersDataModel
          .find({
            name: shareName,
          })
          .sort({ date: 1 })
          .lean();
        if (shareData.length < 0) {
          res({
            status: 200,
            data: shareData,
          });
        } else {
          rej({ status: 400, message: "ShareData not Foumd" });
        }
      } else {
        rej({
          status: 400,
          message: "ShareName is require..!!",
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
