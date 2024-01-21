import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const date = new Date().toDateString().split(" ").slice(1).join("-")
    cb(null, date + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
