import { v4 as uuidv4 } from "uuid";
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import serviceAccount from "../helper/theNeturalHubFirebaseConfig.js";
import fs from "fs";
import path from "path";

initializeApp({
  credential: cert(serviceAccount),
});

const bucket = getStorage().bucket("gs://tnhimage.appspot.com");

export async function uploadService(image) {
  return new Promise(async (res, rej) => {
    try {
      //firebase logic to upload the image
      let i;
      let media = [];
      if (!image.file.length) {
        let uploaded = await bucket.upload(image.file.filepath, {
          public: true,
          destination: `images/${
            Math.random() * 10000 + image.file.originalFilename
          }`,
          metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
          },
        });
        let data = await uploaded;
        data = data[0];
        if (data) {
          media.push({
            mediaLink: data.metadata.mediaLink,
            name: data.metadata.name,
          });
        }
      } else {
        for (i = 0; i < image.file.length; i++) {
          let uploaded = await bucket.upload(image.file[i].filepath, {
            public: true,
            destination: `images/${
              Math.random() * 10000 + image.file[i].originalFilename
            }`,
            metadata: {
              firebaseStorageDownloadTokens: uuidv4(),
            },
          });
          let data = await uploaded;
          data = data[0];
          if (data) {
            media.push({
              mediaLink: data.metadata.mediaLink,
              name: data.metadata.name,
            });
          }

          // fs.unlink(image[i].path, (err) => {
          //   if (err) console.log("someError: ", err);
          // });
        }
      }

      if (media) {
        // fs.unlinkSync(image.path);

        res({
          status: 200,
          data: media,
        });

        // let uploaded = bucket.upload(image.multi.filepath, {
        //   public: true,
        //   destination: `images/${
        //     Math.random() * 10000 + image.multi.originalFilename
        //   }`,
        //   metadata: {
        //     firebaseStorageDownloadTokens: uuidv4(),
        //   },
        // });
        // let data = await uploaded;
        // data = data[0];
        // if (data) {
        //   media.push({
        //     mediaLink: data.metadata.mediaLink,
        //     name: data.metadata.name,
        //   });
        //   res({
        //     status: 200,
        //     data: media,
        //   });
      } else {
        rej({ status: 404, message: "something went wrong!!" });
      }
      //firebase logic to upload the image
      // let i;
      // let media = [];
      // console.log("image .....", image);
      // for (i = 0; i < image.length; i++) {
      //   let uploaded = await bucket.upload(image[i].path, {
      //     public: true,
      //     destination: `images/${Math.random() * 10000 + image[i].filename}`,
      //     metadata: {
      //       firebaseStorageDownloadTokens: uuidv4(),
      //     },
      //   });
      //   let data = await uploaded;
      //   data = data[0];
      //   media.push({
      //     mediaLink: data.metadata.mediaLink,
      //     name: data.metadata.name,
      //   });
      //   fs.unlink(image[i].path, (err) => {
      //     if (err) console.log("someError: ", err);
      //   });
      // }
      // if (media) {
      //   // fs.unlinkSync(image.path);

      //   res({
      //     status: 200,
      //     data: media,
      //   });
      // } else {
      //   rej({ status: 404, message: "something went wrong!!" });
      // }
    } catch (err) {
      console.log("error ...", err);
      rej({ status: 500, error: err });
    }
  });
}
export async function deleteService(file) {
  return new Promise(async (res, rej) => {
    try {
      const deleted = await bucket.file(file).delete();
      if (deleted) {
        res({ status: 200, data: "File Deleted Successfully!!" });
      } else {
        rej({ status: 404, error: err });
      }
    } catch (err) {
      console.log("err...", err);
      rej({ status: 500, error: err, message: "something went wrong!!" });
    }
  });
}
