import { ValidateErrors } from "./../@types/Response";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
const convertError = (errors: ValidationError[]): ValidateErrors => {
  let result: any = {};
  for (const err of errors) {
    if (err.children && err.children.length) {
      result[err.property] = convertError(err.children);
    } else {
      result[err.property] = Object.keys(err.constraints).map((key) => ({
        value: err.value,
        code: key,
        message: err.constraints[key],
      }));
    }
  }
  return result;
};
export const ValidForm = async <T>(
  formClass: { new (...args): T },
  data
): Promise<{
  form?: T;
  errors?: ValidateErrors;
}> => {
  let convertClass = plainToClass(formClass, [data])[0];
  let errors = await validate(convertClass);
  if (errors && errors.length > 0) {
    let validateErrors: ValidateErrors = convertError(errors);
    return { errors: validateErrors };
  }

  return { form: convertClass };
};
