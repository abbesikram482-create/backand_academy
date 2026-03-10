const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirs = {
  cours: path.join(__dirname, "..", "uploads", "cours"),
  certificats: path.join(__dirname, "..", "uploads", "certificats"),
  projets: path.join(__dirname, "..", "uploads", "projets"),
};

Object.values(uploadDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "cours";
    if (req.baseUrl.includes("certificate")) folder = "certificats";
    if (req.baseUrl.includes("project")) folder = "projets";
    cb(null, uploadDirs[folder]);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

module.exports = upload;
