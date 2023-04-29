"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//? 2- create schema
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: false,
    },
    oldPrice: {
        type: Number,
        required: false,
    },
    store: {
        type: String,
        required: false,
    },
    menuType: {
        type: String,
        required: false,
    },
    details: {
        type: String,
        required: false,
    },
    images: {
        type: [String],
        required: false,
    },
});
//? 3- create model
const Product = (0, mongoose_1.model)("Product", productSchema);
//? 4- export model
exports.default = Product;
