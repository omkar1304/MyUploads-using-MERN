import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";


const authenticate = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  console.log(token)

  if (token) {
    try {
      const { userId } = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(userId).select("-password");
      next();
    } catch (error) {
      res.status(401).send("Not authorized, token failed.");
    }
  } else {
    res.status(401).send("Not authorized, token failed.");
  }
};

export { authenticate }
