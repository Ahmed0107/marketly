require("dotenv").config();
import cloudinary from "cloudinary";

// Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploudToCloudinary = (path: string, folder: string): object => {
  return cloudinary.v2.uploader
    .upload(path, { folder })
    .then((data) => {
      return data.url;
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const removeFromCloudinary = async (public_id: any) => {
//   await cloudinary.v2.uploader.destroy(public_id, function (error: any, result: any) {
//     console.log(result, error);
//   });
// };
