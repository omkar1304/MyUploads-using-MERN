import path from "path";
import File from "../model/FileModel.js";
import generateCode from "../utils/createCode.js";
import fs from "fs";

const uploadFile = async (req, res) => {
  const { _id: userId } = req.user;
  const { filename } = req.file;
  const code = generateCode();

  if (!userId || !filename) {
    throw new Error("All fields are required!");
  }

  try {
    const file = await File({ userId, filename, code });
    await file.save();

    return res.json(file);
  } catch (error) {
    return res.status(500).send("Error uploading file.");
  }
};

const getAllUserFile = async (req, res) => {
  const { _id: userId } = req.user;

  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const files = await File.find({ userId }).sort({ createdAt: -1 });
    return res.json(files);
  } catch (error) {
    return res.status(500).send("Error fetching files.");
  }
};

const deleteFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).send("File not found.");
    }

    await fs.promises.unlink(path.join("uploads", file.filename));
    await File.findByIdAndDelete(fileId);

    return res.send("File deleted successfully.");
  } catch (error) {
    return res.status(500).send("Error deleting file.");
  }
};

const downloadFile = async (req, res) => {
  const { code } = req.params;

  try {
    const file = await File.findOne({ code: code });
    if (!file) {
      return res.status(404).send("File not found.");
    }
    const filePath = path.join("uploads", file.filename);
    res.header('Access-Control-Expose-Headers', 'Content-Disposition').download(filePath, file.filename);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error downloading file.");
  }
};

export { uploadFile, getAllUserFile, deleteFile, downloadFile };
