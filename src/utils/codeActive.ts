import dotenv from "dotenv";
import { stringify } from "querystring";
dotenv.config();
const { ARRAYSTRING } = process.env;
const newArrayString: string[] = ARRAYSTRING.split(",");
export const randomString = (num: number) => {
  let result: string = "";
  for (let i = 0; i < num; i++) {
    result +=
      newArrayString[Math.floor(Math.random() * newArrayString.length - 1)];
  }
  return result;
};
