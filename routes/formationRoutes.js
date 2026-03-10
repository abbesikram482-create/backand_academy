const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getFormations,
  createFormation,
  updateFormation,
  deleteFormation,
} = require("../controllers/FormationController");

// -------- MULTER CONFIG --------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// -------- ROUTES --------
router.get("/", getFormations);

router.post("/", upload.single("image"), createFormation);

router.put("/:id", upload.single("image"), updateFormation);

router.delete("/:id", deleteFormation);

module.exports = router;
