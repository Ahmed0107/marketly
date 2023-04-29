"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product_controller");
const prodImgUploader_1 = __importDefault(require("../img_uploader/prodImgUploader"));
const router = express_1.default.Router();
// Get Products route
router.get("/all", product_controller_1.getAllProducts);
// Get Products route
router.get("/menu/:menuType", product_controller_1.getProductsByMenuType);
// Add New Products route
router.post("/add", prodImgUploader_1.default.array("images"), product_controller_1.addNewProduct);
router.post("/test", prodImgUploader_1.default.array("images"), product_controller_1.testProduct);
exports.default = router;
