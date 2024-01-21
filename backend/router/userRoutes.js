import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/UserController.js";

const router = express.Router();

// Post Methods 👇
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
