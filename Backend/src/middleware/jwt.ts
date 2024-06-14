import jwt from "jsonwebtoken";
import { UserDetails } from "../models/userTable";

export const generateToken = (user: UserDetails): string => {
  return jwt.sign({ id: user.ID, role:user.role }, "SECRET_KEY", { expiresIn: "2h" });
};
