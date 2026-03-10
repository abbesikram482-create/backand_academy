const Formation = require("../models/Formation");

const ajouterFormation = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image = `cours/${req.file.filename}`;
    }

    if (payload.duree !== undefined) {
      const n = Number(payload.duree);
      if (!Number.isNaN(n)) payload.duree = n;
    }

    const formation = await Formation.create(payload);
    res.status(201).json(formation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listerFormations = async (req, res) => {
  try {
    const formations = await Formation.find();
    res.json(formations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const modifierFormation = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image = `cours/${req.file.filename}`;
    }

    if (payload.duree !== undefined) {
      const n = Number(payload.duree);
      if (!Number.isNaN(n)) payload.duree = n;
    }

    const formation = await Formation.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );
    if (!formation) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }
    res.json(formation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const supprimerFormation = async (req, res) => {
  try {
    const formation = await Formation.findByIdAndDelete(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }
    res.json({ message: "Formation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ajouterFormation,
  listerFormations,
  modifierFormation,
  supprimerFormation
};
