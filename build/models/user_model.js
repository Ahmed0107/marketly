"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    mobile: String,
    hasAStore: Boolean,
});
// 3. Create a Model.
const User = (0, mongoose_1.model)("Users", userSchema);
// 4. Export the Model.
exports.default = User;
