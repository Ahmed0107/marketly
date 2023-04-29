import mongoose, { Schema, model } from "mongoose";

//? 1- create product interface
export interface IProduct {
  title: string;
  price: number;
  oldPrice: number;
  store: string;
  menuType: string;
  details: string;
  images: string[];
}

//? 2- create schema
const productSchema = new Schema<IProduct>({
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
const Product = model<IProduct>("Product", productSchema);

//? 4- export model
export default Product;
