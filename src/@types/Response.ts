import { type } from "os";

export type SuccessResponse<T> = {
  success?: true;
  metadate: string;
  message: string;
  data?: T;
};
export type ErrorsResponse = {
  error: string;
  code: number;
  message: string;
  data?: any;
};

export type ValidateErrors = {
  [type: string]: {
    [constrainName: string]: string;
  };
};

export const ValidateErrorResponse = (
  validateError: ValidateErrors
): ErrorsResponse => ({
  error: "VALIDATED ERROR",
  code: 400,
  message: "VALIDATED ERROR",
  data: validateError,
});
