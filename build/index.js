"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const product_route_1 = __importDefault(require("./routes/product_route"));
const path_1 = require("path");
// Intiate app after all packages
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.DB)
    .then(() => console.log("Datbase Connected"))
    .catch(() => console.log("Can not Connect to Database"));
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(body_parser_1.default.json());
app.use(express_1.default.static((0, path_1.join)(__dirname, "public")));
app.use("/uploads", express_1.default.static((0, path_1.join)(__dirname, "uploads")));
app.use("/", auth_1.default);
app.use("/products", product_route_1.default);
app.get("/", (req, res) => {
    res.send("Hello From ts");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
