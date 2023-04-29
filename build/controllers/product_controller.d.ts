import { Request, Response } from "express";
export declare const getAllProducts: (req: Request, res: Response) => Promise<void>;
export declare const getProductsByMenuType: (req: Request, res: Response) => Promise<void>;
export declare const addNewProduct: (req: Request, res: Response) => Promise<void>;
export declare const testProduct: (req: Request, res: Response) => void;
