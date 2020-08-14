import { Schema, model, Document } from "mongoose";
import { randomString } from "./../utils/codeActive";
export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  active: { type: Boolean; default: false };
  codeActive: string;
  group: number;

  name: string;
  email: string;
  phoneNumber: number;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const userSchema = new Schema(
  {
    username: String,
    password: String,
    active: { type: Boolean, default: false },
    codeActive: { type: String, default: randomString(30) },
    group: Number,

    name: String,
    email: String,
    phoneNumber: Number,
    address: String,
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);
export default model<IUser>("user", userSchema);
