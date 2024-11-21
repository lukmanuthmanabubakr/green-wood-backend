const fs = require("fs");
const ImageModel = require("../models/imageModel");
const sendEmailWithAttachment = require("../utils/emailHelper");

const uploadImage = async (req, res) => {
  try {
    const { file } = req;

    if (!file) return res.status(400).json({ message: "No file uploaded!" });

    // Save image in MongoDB
    const image = new ImageModel({
      filename: file.filename,
      contentType: file.mimetype,
      imageBase64: fs.readFileSync(file.path).toString("base64"),
    });
    await image.save();

    // Send email with image attachment
    await sendEmailWithAttachment({
      to: "recipient@example.com", // Replace with the recipient's email
      subject: "User Passport Image",
      text: "A new user has uploaded their passport image.",
      attachmentPath: file.path,
      attachmentName: file.originalname,
    });

    // Cleanup uploaded file
    fs.unlinkSync(file.path);

    res.status(200).json({ message: "Image uploaded and email sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadImage };
