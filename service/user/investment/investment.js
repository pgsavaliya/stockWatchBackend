import {
  investmentShareDataModel,
  investmentShareNameModel,
  investmentOptimisedIndecatersDataModel,
} from "../../../model/index.js";

export async function getInvestmentDataService(shareName) {
  return new Promise(async (res, rej) => {
    try {
      if (shareName || shareName != null) {
        let investmentShareData = await investmentShareDataModel
          .find({ name: shareName })
          .sort({ date: -1 })
          .lean();
        if (investmentShareData.length > 0) {
          res({
            status: 200,
            data: {
              Count: investmentShareData.length,
              data: investmentShareData,
            },
            message: "SUCESS!!",
          });
        } else {
          rej({ status: 400, message: "Data Not Found" });
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

export async function getInvestmentOptimisedDataService(shareName) {
  return new Promise(async (res, rej) => {
    try {
      if (shareName || shareName != null) {
        let investmentOptimisedShareData =
          await investmentOptimisedIndecatersDataModel
            .find({ name: shareName })
            .sort({ date: -1 })
            .lean();
        if (investmentOptimisedShareData.length > 0) {
          res({
            status: 200,
            data: {
              Count: investmentOptimisedShareData.length,
              data: investmentOptimisedShareData,
            },
            message: "SUCESS!!",
          });
        } else {
          rej({ status: 400, message: "Data Not Found" });
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

export async function getInvestmentShareNamesService() {
  return new Promise(async (res, rej) => {
    try {
      let investmentShareName = await investmentShareNameModel.find().lean();
      if (investmentShareName.length > 0) {
        let investmentName = [];
        investmentShareName.map((item) => {
          investmentName.push(item.name);
        });
        res({
          status: 200,
          data: { Count: investmentName.length, data: investmentName },
          message: "SUCESS!!",
        });
      } else {
        rej({ status: 400, message: "Data Not Found" });
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
