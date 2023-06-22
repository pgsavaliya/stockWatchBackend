// import { productModel } from "../model/index.js";

export async function generateUniqueCode() {
  return new Promise(async (res, rej) => {
    let uniqueCode = (await Math.floor(Math.random() * 90000000)) + 10000000;
    do {
      uniqueCode = (await Math.floor(Math.random() * 90000000)) + 10000000;
    } while (
      await productModel.findOne({
        uniqueCode: uniqueCode,
      })
    );
    res(uniqueCode);
  });
}
