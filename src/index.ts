import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { configDB } from "./utils/configDB";
import { ARouter } from "./routers/Auth.c";
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
const { PORT, HOST } = process.env;
configDB();
app.use("/API", ARouter);
app.get("*", (req: Request, res: Response) => {
  res.status(400).json("Not found");
});
app.post("*", (req: Request, res: Response) => {
  res.status(400).json("Not found");
});
app.put("*", (req: Request, res: Response) => {
  res.status(400).json("Not found");
});
app.delete("*", (req: Request, res: Response) => {
  res.status(400).json("Not found");
});
app.listen(PORT, () => {
  console.log(`Start ${HOST}:${PORT}`);
});
