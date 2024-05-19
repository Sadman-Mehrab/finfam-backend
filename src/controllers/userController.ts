import { comparePasswords, generateJWT, hashPassword } from "../services/authService";
import { UserModel } from "../models/userModel";

export const signup = async (req: any, res: any) => {
  const { userName, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const userDoc: any = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    });
    const { password, ...user } = userDoc.toObject();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: any, res: any) => {
  const { userName, password } = req.body;
  try {
    const userDoc: any = await UserModel.findOne({ userName: userName });
    const user = userDoc.toObject();
    const isPasswordValid = await comparePasswords(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const generatedToken = await generateJWT(user);
    const response = { access_token: generatedToken, userName: userName };
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: "User Not Found" });
  }
};
