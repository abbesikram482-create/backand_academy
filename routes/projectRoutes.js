const express = require("express");
const router = express.Router();

const projectController = require("../controllers/ProjectController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

router.post(
  "/ajouter",
  protect,
  authorize(["admin"]),
  upload.single("image"),
  projectController.ajouterProjet
);

router.get(
  "/",
  projectController.listerProjets
);

router.put(
  "/modifier/:id",
  protect,
  authorize(["admin"]),
  upload.single("image"),
  projectController.modifierProjet
);

router.delete(
  "/supprimer/:id",
  protect,
  authorize(["admin"]),
  projectController.supprimerProjet
);

module.exports = router;
