import { Request, Response } from "express";
import User, { IUser } from "../../models/User";
import { ErrorsResponse, SuccessResponse } from "../../@types/Response";
import { ValidFormMiddleware } from "../../middlewares/ValidFormMiddleware";
import { UserForm, loginFormUser } from "../../inputforms/UserFrom";
import { hashSync, compareSync } from "bcrypt";
import {
  accessAcount,
  verifyToken,
  IAccessTokenData,
} from "./../../utils/authUtil";
const saltRounds = 10;
//register account
const register = [
  //validate form
  ValidFormMiddleware(UserForm, "body"),
  async (req: Request & { form: UserForm }, res: Response) => {
    // check username and email exist
    try {
      const user = await User.find({
        $or: [{ username: req.form.username }, { email: req.form.email }],
      });
      // if username and email exist, send error to client

      if (user && user.length > 0) {
        const errorResponse: ErrorsResponse = {
          code: 400,
          error:
            "User name or email is exist, please choose another user name or another email",
          message:
            "User name or email is exist, please choose another user name or another email",
        };
        return res.status(400).json(errorResponse);
      }
      // hash password before create account
      req.form.password = hashSync(req.form.password, saltRounds);
      const createUser: IUser = await User.create(req.form);
      //send message if create account success
      const dataResponse: SuccessResponse<IUser> = {
        success: true,
        message: "Create account success",
        metadate: "Create one account",
        data: createUser,
      };
      res.status(200).json(dataResponse);
    } catch (error) {
      // if create account error, send message error to client
      const errorResponse: ErrorsResponse = {
        code: 400,
        error: "Create account error",
        message: "Create account error",
      };
      res.status(400).json(errorResponse);
    }
  },
];
// activated account
const activeAccount = async (req: Request, res: Response) => {
  try {
    const { codeActive } = req.params;
    // check code active, if code active not exist, send message error to client

    const user: IUser = await User.findOne({ codeActive: codeActive });
    if (!user) {
      const errorResponse: ErrorsResponse = {
        code: 400,
        error: "Could not found account by id",
        message: "Could not found account by id",
      };
      return res.status(400).json(errorResponse);
    }
    // if account has been activated, send message error client.
    if (user.active) {
      const errorResponse: ErrorsResponse = {
        code: 400,
        error: "Account has been activated,you can't re-active your account",
        message: "Account has been activated,you can't re-active your account",
      };
      return res.status(400).json(errorResponse);
    }
    // update account with active filde from flase to true
    await User.findByIdAndUpdate(user._id, { active: true });
    //Send message to client notification account active success
    const dataResponse: SuccessResponse<IUser> = {
      success: true,
      message: "Activated account success",
      metadate: "Activated one account",
    };
    res.status(200).json(dataResponse);
  } catch (error) {
    // if account activated error, send message error to client
    const errorResponse: ErrorsResponse = {
      code: 400,
      error: "Active account error",
      message: "Active account error",
    };
    return res.status(400).json(errorResponse);
  }
};
const login = [
  //validation form with login.
  //if username or password null or error send message error to client, and end login
  ValidFormMiddleware(loginFormUser, "body"),
  async (req: Request & { form: loginFormUser }, res: Response) => {
    try {
      // check user name exist
      const user: IUser = await User.findOne({ username: req.form.username });
      // if username wrong send message error to client
      if (!user) {
        const errorResponse: ErrorsResponse = {
          code: 400,
          error: "Account or password incorrect",
          message: "Account or password incorrect",
        };
        return res.status(400).json(errorResponse);
      }
      // check account actice, if account not update send message and account requite activation
      if (!user.active) {
        const errorResponse: ErrorsResponse = {
          code: 400,
          error: "Account not activation, please activated for account",
          message: "Account not activation, please activated for account",
        };
        return res.status(400).json(errorResponse);
      }
      // check password, if password wrong send message error to client
      const comparePassword = compareSync(req.form.password, user.password);
      if (!comparePassword) {
        const errorResponse: ErrorsResponse = {
          code: 400,
          error: "Account or password incorrect",
          message: "Account or password incorrect",
        };
        return res.status(400).json(errorResponse);
      }
      // access token and header
      let accessToken = accessAcount(user, req.headers);
      const dataResponse: SuccessResponse<any> = {
        success: true,
        message: "Activated account success",
        metadate: "Activated one account",
        data: { user, accessToken },
      };
      res.status(200).json(dataResponse);
    } catch (error) {
      // if login  error, send message error to client
      const errorResponse: ErrorsResponse = {
        code: 400,
        error: "Login account error",
        message: "Login account error",
      };
      return res.status(400).json(errorResponse);
    }
  },
];
export default {
  register,
  activeAccount,
  login,
};
