import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/db.js";
import cookieParser from "cookie-parser";
import { PORT } from "./config.js";

import userRouter from './router/userRoutes.js'
import fileRouter from './router/fileRoutes.js'

const app = express();

// Third party middlewares 👇
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors())


// Routes 
app.use("/api/users", userRouter)
app.use("/api/files", fileRouter)


app.get("/", (req, res) => {
  return res.status(200).send("This is working!");
});

connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server connnected to http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Unable to connect to server");
    }
  })
  .catch(() => {
    console.log("Unable to connect to MongoDB");
  });
