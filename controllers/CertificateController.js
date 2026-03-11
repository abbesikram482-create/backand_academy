const Certificate = require("../models/Certificate");

const ajouterCertificat = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image = `certificats/${req.file.filename}`;
    }

    if (payload.duree !== undefined) {
      const n = Number(payload.duree);
      if (!Number.isNaN(n)) payload.duree = n;
    }

    const certificat = await Certificate.create(payload);
    res.status(201).json(certificat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listerCertificats = async (req, res) => {
  try {
    const certificats = await Certificate.find();
    res.json(certificats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCertificatById = async (req, res) => {
  try {
    const certificat = await Certificate.findById(req.params.id);
    if (!certificat) {
      return res.status(404).json({ message: "Certificat non trouvé" });
    }
    res.json(certificat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const modifierCertificat = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image = `certificats/${req.file.filename}`;
    }

    if (payload.duree !== undefined) {
      const n = Number(payload.duree);
      if (!Number.isNaN(n)) payload.duree = n;
    }

    const certificat = await Certificate.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );
    if (!certificat) {
      return res.status(404).json({ message: "Certificat non trouvé" });
    }
    res.json(certificat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const supprimerCertificat = async (req, res) => {
  try {
    const certificat = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificat) {
      return res.status(404).json({ message: "Certificat non trouvé" });
    }
    res.json({ message: "Certificat supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ajouterCertificat,
  listerCertificats,
  getCertificatById,
  modifierCertificat,
  supprimerCertificat
};
