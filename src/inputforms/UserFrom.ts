import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  Length,
} from "class-validator";
import { randomString } from "./../utils/codeActive";
export class UserForm {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  group: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(8, 30)
  email: string;

  @IsNumber()
  @IsNotEmpty()
  phoneNumber: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  address: string;
}
