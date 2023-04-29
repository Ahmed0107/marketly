import express, { Request, Response } from "express";
import Product from "../models/product_model";
import { jsonMessage } from "../utils/helpers";
import { uploudToCloudinary } from "../img_uploader/cloudinary_services";

//! get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    if (products.length != 0) {
      res.status(200).send(products);
    } else {
      res.status(500).json(jsonMessage("no products found"));
    }
  } catch (err) {
    res.status(501).json(jsonMessage("something went errer", err));
  }
};

//! get products by menu type
export const getProductsByMenuType = async (req: Request, res: Response) => {
  const { menuType } = req.params;
  try {
    const products = await Product.find({ menuType: menuType });
    if (products.length != 0) {
      res.status(200).send(products);
    } else {
      res.status(500).json(jsonMessage("no products found"));
    }
  } catch (error) {
    res.status(500).json(jsonMessage("something went errer", error));
  }
};

//! add new product
export const addNewProduct = async (req: Request, res: Response) => {
  const { title, price, store, details, menuType, oldPrice } = req.body;

  // check if prouct exist
  if (await Product.findOne({ title: title })) {
    res.status(400).json(jsonMessage("prouduct already exist"));
    // ! Must add return; to prevent the error of sending multiple requests {Cannot set headers after they are sent to the client}
    return;
  }

  // add a new product
  try {
    // get Array og images and store them as array
    const images = req.files as Express.Multer.File[];
    const imgArr: object[] = [];

    for (let i = 0; i < images.length; i++) {
      const element = images[i].path;

      const newPath = await uploudToCloudinary(element, "my-images");
      imgArr.push(newPath);
    }

    const newProduct = await Product.create({
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
      .then(() => res.status(200).json(jsonMessage("product saved")))
      .catch((err) =>
        res.status(501).json(jsonMessage("product not saved", err))
      );
  } catch (err) {
    res.status(501).json(jsonMessage("something went wrong", err));
  }
};

// ** just for testing
export const testProduct = (req: Request, res: Response) => {
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
