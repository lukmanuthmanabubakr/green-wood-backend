const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), uploadImage);

module.exports = router;
