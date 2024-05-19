import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { config } from "../config/config";
import { IUser } from "../types/user";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};

export const generateJWT = (user: IUser) => {
  const token = jwt.sign(
    { _id: user._id, userName: user.userName },
    config.JWT_SECRET,
    {
      expiresIn: 3600,
    }
  );
  return token;
};
