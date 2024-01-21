import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js';

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: "30d"
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

    return token;
}

export default generateToken