import { sign, verify } from "jsonwebtoken";
import { Request } from "express";
import { IUser } from "./../models/User";
import dotenv from "dotenv";
dotenv.config();
export interface IAccessTokenData {
  IdUser: string;
  Username: string;
  Group: number;
  RegisterDate: Date;
  HoTen: string;
  Email: string;
  SoDT: number;
  DiaChi: string;
  RequestAgent: any;
  CreatingDate: Date;
}

export const accessAcount = (account: IUser, header: any): string => {
  let accessTokenData: IAccessTokenData = {
    IdUser: account._id,
    Username: account.username,
    Group: account.group,
    RegisterDate: account.createdAt,
    HoTen: account.name,
    Email: account.email,
    SoDT: account.phoneNumber,
    DiaChi: account.address,
    RequestAgent: header,
    CreatingDate: new Date(),
  };
  return sign(accessTokenData, process.env.privateKey, { expiresIn: "3d" });
};
export const verifyToken = (accessToken: string) => {
  return verify(accessToken, process.env.privateKey);
};
