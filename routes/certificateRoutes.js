const express = require("express");
const router = express.Router();

const certificateController = require("../controllers/CertificateController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

router.post(
  "/ajouter",
  protect,
  authorize(["admin"]),
  upload.single("image"),
  certificateController.ajouterCertificat
);

router.get(
  "/",
  certificateController.listerCertificats
);

router.get(
  "/:id",
  certificateController.getCertificatById
);

router.put(
  "/modifier/:id",
  protect,
  authorize(["admin"]),
  upload.single("image"),
  certificateController.modifierCertificat
);

router.delete(
  "/supprimer/:id",
  protect,
  authorize(["admin"]),
  certificateController.supprimerCertificat
);

module.exports = router;
