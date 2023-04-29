require("dotenv").config();
import bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRouter from "./routes/auth";
import productRouter from "./routes/product_route";
import { join } from "path";
// Intiate app after all packages
const app: Application = express();

mongoose
  .connect(process.env.DB as string)
  .then(() => console.log("Datbase Connected"))
  .catch(() => console.log("Can not Connect to Database"));

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use(express.static(join(__dirname, "public")));
app.use("/uploads",express.static(join(__dirname, "uploads")));

app.use("/", authRouter);
app.use("/products", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From ts");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
