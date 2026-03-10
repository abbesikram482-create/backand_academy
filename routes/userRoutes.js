const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Admin only (avoid leaking user list publicly)
router.post("/ajouter", protect, authorize(["admin"]), userController.ajouterUtilisateur);
router.get("/", protect, authorize(["admin"]), userController.listerUtilisateurs);

module.exports = router;
