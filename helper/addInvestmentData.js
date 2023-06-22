import { investmentShareDataModel } from "../model/index.js";
export async function addInvestmentData(shareName) {
  return new Promise(async (res, rej) => {
    try {
      if (shareName && shareName != null) {
        let shareData = await investmentShareDataModel
          .find({
            name: shareName,
            // date: { $gte: date },
          })
          .sort({ date: 1 })
          //   .limit(13)
          .lean();
        console.log("Pavan", shareData.length);
        let shareDatalength = shareData.length;
        if (shareDatalength > 0) {
          // console.log(shareData);
          let finelData = [];
          for (let a = 0; a < shareDatalength; a++) {
            let finelShareData = {};
            if (a < 29) {
              finelShareData.name = shareData[a].name;
              finelShareData.open = shareData[a].open;
              finelShareData.high = shareData[a].high;
              finelShareData.low = shareData[a].low;
              finelShareData.close = shareData[a].prevClose;
              finelShareData.date = shareData[a].date;
              finelShareData.volume = shareData[a].volume;
              if (finelShareData.close > finelShareData.open) {
                finelShareData.candleColor = "green";
              } else {
                finelShareData.candleColor = "red";
              }
              finelData.push(finelShareData);
            } else {
              let shareData1 = [];
              for (let b = 0; b < shareData.length; b++) {
                if (shareData1.length < 30) {
                  shareData1.push(shareData[b]);
                } else {
                  break;
                }
              }
              let bBand = await findbband(shareData1);
              let rsi = await findRSI(shareData1);
              finelShareData.name = bBand.data.name;
              finelShareData.open = bBand.data.open;
              finelShareData.high = bBand.data.high;
              finelShareData.low = bBand.data.low;
              finelShareData.close = bBand.data.prevClose;
              finelShareData.date = bBand.data.date;
              finelShareData.volume = bBand.data.volume;
              finelShareData.middleBand = bBand.middleBand;
              finelShareData.upperBand = bBand.upperBand;
              finelShareData.lowerBand = bBand.lowerBand;
              finelShareData.rsi = rsi.rsi;
              if (finelShareData.close > finelShareData.open) {
                finelShareData.candleColor = "green";
              } else {
                finelShareData.candleColor = "red";
              }
              if (finelShareData.rsi == NaN) {
                finelShareData.rsi = 0;
              }
              finelData.push(finelShareData);

              shareData.shift();
            }
            // console.log(finelShareData);
          }
          res(finelData);
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
async function findbband(data) {
  if (data.length > 0) {
    // let shareData1 = [];
    // for (let q = 0; shareData.length >= 30; q++) {
    let min = 0,
      totalclose = 0,
      totalvalue2 = 0;
    // shareData.map((item,index) => {
    for (let w = 0; w <= 29; w++) {
      totalclose = totalclose + data[w].prevClose;
    }
    // });
    min = totalclose / 30;
    // shareData.map((item) => {
    for (let w = 0; w <= 29; w++) {
      data[w].value = data[w].prevClose - min;
      data[w].value2 = data[w].value * data[w].value;
      totalvalue2 = totalvalue2 + data[w].value2;
    }
    // });
    let s = totalvalue2 / 30;
    s = Math.sqrt(s);
    let middleBand = min,
      upperBand,
      lowerBand;
    upperBand = middleBand + s * 2;
    lowerBand = middleBand - s * 2;
    let data1 = {
      middleBand: middleBand,
      upperBand: upperBand,
      lowerBand: lowerBand,
      data: data[29],
    };
    return data1;
  }
}
async function findRSI(data) {
  return new Promise(async (res, rej) => {
    try {
      //   if ((type, shareName)) {
      //     let date = new Date();
      //     if (type == "intraday") {
      //       if (time) {
      //         date.setMinutes(date.getMinutes() - time);
      //       } else {
      //         rej({
      //           status: 400,
      //           message: "Time is require in intraday type..!!",
      //         });
      //       }
      //     } else {
      //       date.setDate(date.getDate() - 13);
      //     }
      //     const shareData = await investmentShareDataModel
      //       .find({
      //         name: shareName,
      //         // date: { $gte: date },
      //       })
      //       .sort({ date: 1 })
      //       //   .limit(13)
      //       .lean();

      //     if (shareData.length > 0) {
      //       // console.log(shareData.length);
      //       let shareDatalength = shareData.length;
      //       for (let i = 0; i < shareDatalength; i++) {
      //         if (shareData.length > 13) {
      //           shareData.shift();
      //         }
      //       }
      //       // console.log(shareData.length);

      let totalGain, totalLoss;
      //set gain or loss and count total gain and loss
      for (let i = 0; i < data.length - 1; i++) {
        data[i].change = data[i].open - data[i].prevClose;
        if (data[i].change > 0) {
          data[i].gain = data[i].change;
          totalGain = data[i].gain;
        } else {
          data[i].loss = data[i].change * -1;
          totalLoss = data[i].loss;
        }
      }
      //convert total loss negative to positive
      //   totalLoss = totalLoss * -1;

      //find average gain
      data[data.length - 1].avgGain = totalGain / (data.length - 1);
      data[data.length - 1].avgloss = totalLoss / (data.length - 1);

      //find rs
      data[data.length - 1].rs =
        data[data.length - 1].avgGain / data[data.length - 1].avgloss;

      //find rsi
      data[data.length - 1].rsi = 100 - 100 / (1 + data[data.length - 1].rs);

      res(data[data.length - 1]);
      //   res({ status: 200, data: shareData });
      //     } else {
      //       rej({
      //         status: 404,
      //         message: "Share data not found please check share name again..!!",
      //       });
      //     }
      //   } else {
      //     rej({
      //       status: 400,
      //       message: "Type and shareName is require..!!",
      //     });
      //   }
    } catch (err) {
      console.log("err ...", err);
      exit;
      rej({
        status: 500,
        error: err,
        message: err?.message || "Something Went Wrong..!!!",
      });
    }
  });
}
