"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testProduct = exports.addNewProduct = exports.getProductsByMenuType = exports.getAllProducts = void 0;
const product_model_1 = __importDefault(require("../models/product_model"));
const helpers_1 = require("../utils/helpers");
const cloudinary_services_1 = require("../img_uploader/cloudinary_services");
//! get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find({});
        if (products.length != 0) {
            res.status(200).send(products);
        }
        else {
            res.status(500).json((0, helpers_1.jsonMessage)("no products found"));
        }
    }
    catch (err) {
        res.status(501).json((0, helpers_1.jsonMessage)("something went errer", err));
    }
});
exports.getAllProducts = getAllProducts;
//! get products by menu type
const getProductsByMenuType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { menuType } = req.params;
    try {
        const products = yield product_model_1.default.find({ menuType: menuType });
        if (products.length != 0) {
            res.status(200).send(products);
        }
        else {
            res.status(500).json((0, helpers_1.jsonMessage)("no products found"));
        }
    }
    catch (error) {
        res.status(500).json((0, helpers_1.jsonMessage)("something went errer", error));
    }
});
exports.getProductsByMenuType = getProductsByMenuType;
//! add new product
const addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, price, store, details, menuType, oldPrice } = req.body;
    // check if prouct exist
    if (yield product_model_1.default.findOne({ title: title })) {
        res.status(400).json((0, helpers_1.jsonMessage)("prouduct already exist"));
        // ! Must add return; to prevent the error of sending multiple requests {Cannot set headers after they are sent to the client}
        return;
    }
    // add a new product
    try {
        // get Array og images and store them as array
        const images = req.files;
        const imgArr = [];
        for (let i = 0; i < images.length; i++) {
            const element = images[i].path;
            const newPath = yield (0, cloudinary_services_1.uploudToCloudinary)(element, "my-images");
            imgArr.push(newPath);
        }
        const newProduct = yield product_model_1.default.create({
            title: title,
            price: price,
            oldPrice: oldPrice,
            menuType: menuType,
            store: store,
            details: details,
            images: [...imgArr],
        });
        newProduct
            .save()
            .then(() => res.status(200).json((0, helpers_1.jsonMessage)("product saved")))
            .catch((err) => res.status(501).json((0, helpers_1.jsonMessage)("product not saved", err)));
    }
    catch (err) {
        res.status(501).json((0, helpers_1.jsonMessage)("something went wrong", err));
    }
});
exports.addNewProduct = addNewProduct;
// ** just for testing
const testProduct = (req, res) => {
    // const images = req.files as Express.Multer.File[];
    // const imgArr: string[] = [];
    // images.forEach((img) => {
    //   imgArr.push(
    //     `${req.protocol}://${req.headers.host}/uploads/products/${
    //       Date.now().toString().slice(0, 10) + img.originalname
    //     }`
    //   );
    // });
    // console.log(imgArr);
    // res.send("ok");
};
exports.testProduct = testProduct;
