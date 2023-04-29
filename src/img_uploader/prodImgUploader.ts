require('dotenv').config()
import express, { Request, Response } from "express";
import multer, { diskStorage } from "multer";



const storage = diskStorage({});

const imgUploder = multer({ storage: storage });

export default imgUploder;
