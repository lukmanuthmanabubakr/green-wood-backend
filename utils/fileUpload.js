const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary"); // Import Cloudinary config

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "kyc_documents", // Folder in Cloudinary
      format: "png", // Convert all uploads to PNG
      public_id: `${file.fieldname}-${Date.now()}`,
    };
  },
});

// File filter to allow additional image types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp|bmp|heic|pdf/;
  const extname = allowedFileTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, .png, .gif, .webp, .bmp, .heic, and .pdf files are allowed"));
  }
};

// Set up multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Increased max file size to 10MB
  fileFilter,
});

module.exports = upload;
