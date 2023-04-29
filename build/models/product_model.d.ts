import mongoose from "mongoose";
export interface IProduct {
    title: string;
    price: number;
    oldPrice: number;
    store: string;
    menuType: string;
    details: string;
    images: string[];
}
declare const Product: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct> & Omit<IProduct & {
    _id: mongoose.Types.ObjectId;
}, never>, any>;
export default Product;
