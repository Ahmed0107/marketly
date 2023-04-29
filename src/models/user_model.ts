import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  username: string;
  email: string;
  password: string;
  mobile: string;
  hasAStore: boolean;
}

// 2. Create a Schema corresponding to the document interface
const userSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  mobile: String,
  hasAStore: Boolean,
});

// 3. Create a Model.
const User = model<IUser>("Users", userSchema);

// 4. Export the Model.
export default User;
