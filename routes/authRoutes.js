const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get(
  "/admin",
  protect,
  authorize(["admin"]),
  (req, res) => {
    res.json({ message: "Bienvenue Admin" });
  }
);

module.exports = router;
