import express from "express";
import {
  addNewProduct,
  getAllProducts,
  getProductsByMenuType,
  testProduct,
} from "../controllers/product_controller";
import prodImgUploader from "../img_uploader/prodImgUploader";

const router = express.Router();

// Get Products route
router.get("/all", getAllProducts);

// Get Products route
router.get("/menu/:menuType", getProductsByMenuType);

// Add New Products route
router.post("/add", prodImgUploader.array("images"), addNewProduct);
router.post("/test", prodImgUploader.array("images"), testProduct);

export default router;
