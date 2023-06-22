async function getAll(qry, page, limit, model) {
  return new Promise(async (res, rej) => {
    await model
      .aggregate([
        { $match: qry },
        {
          $facet: {
            totalCount: [
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
            result: [
              { $sort: { createdAt: -1 } },
              { $skip: (page - 1) * limit },
              { $limit: limit },
            ],
          },
        },
      ])
      .then((item) => {
        if (item.length !== undefined) {
          item = item[0];
          res({
            status: 200,
            data: {
              total_count: item.totalCount[0]?.count,
              result: item.result,
            },
          });
        } else {
          itemNotFound(err, item, rej);
        }
      })
      .catch((err, item) => {
        itemNotFound(err, item, rej);
      });

    // .exec((err, item) => {

    // });
  });
}

async function getAllProduct(qry, page, limit, watchlistOfUser, model) {
  return new Promise(async (res, rej) => {
    await model
      .aggregate([
        { $match: qry },
        {
          $facet: {
            totalCount: [
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
            result: [
              {
                $addFields: {
                  watchlist: { $in: ["$uniqueCode", watchlistOfUser] },
                },
              },
              { $skip: (page - 1) * limit },
              { $limit: limit },
            ],
          },
        },
      ])
      .then((item) => {
        if (err) {
          itemNotFound(err, item, rej);
        } else if (item.length !== undefined) {
          item = item[0];
          res({
            status: 200,
            data: {
              total_count: item.totalCount[0]?.count,
              result: item.result,
            },
          });
        } else {
          itemNotFound(err, item, rej);
        }
      })
      .catch((err, item) => itemNotFound(err, item, rej));
    // .exec((err, item) => {
    //   if (err) {
    //     itemNotFound(err, item, rej);
    //   } else if (item.length !== undefined) {
    //     item = item[0];
    //     res({
    //       status: 200,
    //       data: {
    //         total_count: item.totalCount[0]?.count,
    //         result: item.result,
    //       },
    //     });
    //   } else {
    //     itemNotFound(err, item, rej);
    //   }
    // });
  });
}

async function getById(_id, model) {
  return new Promise(async (res, rej) => {
    await model.find(_id).exec((err, item) => {
      if (err) {
        itemNotFound(err, item, rej);
      } else if (!item) {
        res({ status: 400, message: "Invalid id..!!" });
      } else {
        res({ status: 200, data: item });
      }
    });
  });
}

async function getByIdOnly(_id, model) {
  return new Promise(async (res, rej) => {
    await model.findById(_id).exec((err, item) => {
      if (err) {
        itemNotFound(err, item, rej);
      } else if (!item) {
        res({ status: 400, message: "Invalid id..!!" });
      } else {
        res({ status: 200, data: item });
      }
    });
  });
}

async function save(data, model) {
  return new Promise((res, rej) => {
    new model(data)
      .save()
      .then(() => {
        console.log("Data Saved", data);
        res({ status: 200, data: "Data Saved..!!" });
      })
      .catch((err, item) => {
        console.log(err);
        // console.log(data);
      });
    // itemNotFound(err, item, rej));
  });
}

async function findOneAndUpdate(params, data, model) {
  return new Promise(async (res, rej) => {
    await model
      .findOneAndUpdate(params, data, { new: true })
      .exec((err, item) => {
        if (err) itemNotFound(err, item, rej);
        else res({ status: 200, data: item });
      });
  });
}

async function updateMany(params, data, model) {
  return new Promise(async (res, rej) => {
    await model.updateMany(params, data, { new: true }).exec((err, item) => {
      if (err) itemNotFound(err, item, rej);
      else res({ status: 200, data: item });
    });
  });
}

async function findByIdAndUpdate(_id, data, model) {
  return new Promise(async (res, rej) => {
    await model
      .findByIdAndUpdate(_id, data, {
        new: true,
      })
      .exec((err, item) => {
        if (err) itemNotFound(err, item, rej);
        else if (item == null) res({ status: 404, message: "Invalid Id..!!" });
        else res({ status: 200, data: "Data Updated..!!" });
      });
  });
}

async function findOneAndDelete(params, model) {
  return new Promise(async (res, rej) => {
    await model.findOneAndDelete(params).exec((err, item) => {
      // console.log("item",item)
      // console.log("error",err);
      if (err) itemNotFound(err, item, rej);
      else if (!item) res({ status: 400, message: "Invalid Id!!" });
      else res({ status: 200, data: "data Deleted..!!" });
    });
  });
}

async function deleteMany(params, model) {
  return new Promise(async (res, rej) => {
    await model.deleteMany(params).exec((err, item) => {
      if (err) itemNotFound(err, item, rej);
      else res({ status: 200, data: item });
    });
  });
}

async function itemNotFound(err, item, rej) {
  if (err) rej({ status: 500, message: { err: err, item: item } });
  else rej({ status: 400, message: "No Data Found..!!" });
}

async function findByIdAndDelete(_id, model) {
  return new Promise(async (res, rej) => {
    await model.findByIdAndDelete(_id).exec((err, item) => {
      if (err) itemNotFound(err, item, rej);
      else if (item == null) res({ status: 404, message: "Invalid Id..!!" });
      else res({ status: 200, data: "Data Updated..!!" });
    });
  });
}

export {
  getAll,
  getAllProduct,
  getById,
  getByIdOnly,
  save,
  findOneAndUpdate,
  updateMany,
  findByIdAndUpdate,
  findOneAndDelete,
  deleteMany,
  itemNotFound,
  findByIdAndDelete,
};
