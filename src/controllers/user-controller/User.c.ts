import { Request, Response } from "express";
import User, { IUser } from "../../models/User";
import { ErrorsResponse, SuccessResponse } from "../../@types/Response";
import { ValidFormMiddleware } from "../../middlewares/ValidFormMiddleware";
import { UserForm } from "../../inputforms/UserFrom";
const register = [
  ValidFormMiddleware(UserForm, "body"),
  async (req: Request & { form: UserForm }, res: Response) => {
    try {
      const user = await User.find({
        $or: [{ username: req.form.username }, { email: req.form.email }],
      });
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
      const createUser: IUser = await User.create(req.form);
      const dataResponse: SuccessResponse<IUser> = {
        success: true,
        message: "Create account success",
        metadate: "Create one account",
        data: createUser,
      };
      res.status(200).json(dataResponse);
    } catch (error) {
      const errorResponse: ErrorsResponse = {
        code: 400,
        error: "Create account error",
        message: "Create account error",
      };
      res.status(400).json(errorResponse);
    }
  },
];
const activeAccount = async (req: Request, res: Response) => {
  try {
    const { codeActive } = req.params;
    const user: IUser = await User.findOne({ codeActive: codeActive });
    if (!user) {
      const errorResponse: ErrorsResponse = {
        code: 400,
        error: "Could not found account by id",
        message: "Could not found account by id",
      };
      return res.status(400).json(errorResponse);
    }
    if (user.active) {
      const errorResponse: ErrorsResponse = {
        code: 400,
        error: "Account has been activated,you can't re-active your account",
        message: "Account has been activated,you can't re-active your account",
      };
      return res.status(400).json(errorResponse);
    }

    await User.findByIdAndUpdate(user._id, { active: true });
    const dataResponse: SuccessResponse<IUser> = {
      success: true,
      message: "Activated account success",
      metadate: "Activated one account",
    };
    res.status(200).json(dataResponse);
  } catch (error) {
    const errorResponse: ErrorsResponse = {
      code: 400,
      error: "Active account error",
      message: "Active account error",
    };
    return res.status(400).json(errorResponse);
  }
};
export default {
  register,
  activeAccount,
};
