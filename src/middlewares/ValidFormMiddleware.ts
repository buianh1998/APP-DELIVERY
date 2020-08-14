import { ValidateErrorResponse } from "../@types/Response";
import { Request, Response, NextFunction } from "express";
import { ValidForm } from "./../validators/ValidForm";

export const ValidFormMiddleware = <T>(
  formClass: { new (): T; [type: string]: any },
  properType: "body" | "parmas" | "query"
) => async (
  req: Request & { form: T | undefined },
  res: Response,
  next: NextFunction
) => {
  let { form, errors } = await ValidForm(formClass, req[properType]);
  if (errors) {
    return res.status(412).json(ValidateErrorResponse(errors));
  }
  req.form = form;
  next();
};
