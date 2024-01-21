import mongoose from "mongoose";
import { mongoDBURL } from "../config.js";

const connect = async () => {
  const db = await mongoose.connect(mongoDBURL);
  console.log("MongoDB connected!");
  return db;
};

export default connect;
