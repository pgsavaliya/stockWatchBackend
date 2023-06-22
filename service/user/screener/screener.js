import { shareDataModel, shareScreenerModel } from "../../../model/index.js";
import { save } from "../../../helper/index.js";

export async function getEarlyScreenerService() {
  return new Promise(async (res, rej) => {
    try {
      let date = new Date();
      date.setHours(9, 15);
      let shareData = await shareDataModel
        .find({
          createdAt: date,
        })
        .lean();

      if (shareData.length > 0) {
        shareData.map((item) => {
          (item.shareName = item.name),
            (item.startsharePrice = item.open),
            (item.currentsharePrice = item.open),
            (item.achivePrice = item.open + item.open * 0.02),
            (item.stopLossPrice = item.open - item.open * 0.01);
        });

        const saveData = await save(shareData, shareScreenerModel);
        if (saveData) {
          let datefor1130 = new Date();
          datefor1130.setHours(11, 30);
          async function runEveryminute() {
            console.log("Hello World!");
            let newCurrentDate = new Date();
            newCurrentDate.setSeconds(0, 0);
            let lastdaylastrecordDate = new Date();
            lastdaylastrecordDate.setDate(lastdaylastrecordDate.getDate() - 1);
            lastdaylastrecordDate.setHours(15, 30, 0, 0);
            let lastDayShareData = await shareDataModel.find({
              createdAt: {
                $get: lastdaylastrecordDate,
              },
            });
            let newshareData = await shareDataModel
              .find({
                createdAt: {
                  $get: newCurrentDate,
                },
              })
              .lean();

            if (
              datefor1130.getHours() == newCurrentDate.getHours() &&
              datefor1130.getMinutes() == newCurrentDate.getMinutes()
            ) {
              clearInterval(runeverymin);
            }
          }
          let runeverymin = setInterval(runEveryminute, 60000);
          res(saveData);
        } else rej({ status: 500, message: "Something Went Wrong..!!" });
      } else {
        rej({ status: 404, message: "Data Not Found!!" });
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
