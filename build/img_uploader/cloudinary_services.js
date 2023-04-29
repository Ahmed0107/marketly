"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploudToCloudinary = void 0;
require("dotenv").config();
const cloudinary_1 = __importDefault(require("cloudinary"));
// Configuration
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploudToCloudinary = (path, folder) => {
    return cloudinary_1.default.v2.uploader
        .upload(path, { folder })
        .then((data) => {
        return data.url;
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.uploudToCloudinary = uploudToCloudinary;
// export const removeFromCloudinary = async (public_id: any) => {
//   await cloudinary.v2.uploader.destroy(public_id, function (error: any, result: any) {
//     console.log(result, error);
//   });
// };
