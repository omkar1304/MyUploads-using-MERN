import express from "express";
import { getAllUserFile, uploadFile,deleteFile, downloadFile } from "../controllers/FileController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// Post Methods 👇
router.post("/upload", authenticate, upload.single("file"), uploadFile);

// Get Methods 👇
router.get("/", [authenticate], getAllUserFile);
router.get("/download/:code", downloadFile)

// Delete Methods 👇
router.delete("/:fileId", [authenticate], deleteFile)

export default router;
