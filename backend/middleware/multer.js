const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  // Define file destination
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  // Name file
  filename: function (req, file, callback) {
    callback(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3, // 3 MB limit
  },
  fileFilter: function (req, file, callback) {
    // Optional: Add file type validation
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return callback(null, true);
    } else {
      callback(new Error("Only images are allowed"));
    }
  },
});

module.exports = upload;
