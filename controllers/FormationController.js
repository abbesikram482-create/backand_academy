const Formation = require("../models/Formation");

// GET
const getFormations = async (req, res) => {
  try {
    const formations = await Formation.find();
    res.json(formations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
const getFormationById = async (req, res) => {
  try {
    const { id } = req.params;
    const formation = await Formation.findById(id);
    if (!formation) return res.status(404).json({ message: "Formation non trouvée" });
    res.json(formation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
const createFormation = async (req, res) => {
  try {
    const formationData = { ...req.body };
    if (req.file) {
      formationData.image = req.file.filename;
    }
    const formation = new Formation(formationData);
    const saved = await formation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT
const updateFormation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const updated = await Formation.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Formation non trouvée" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteFormation = async (req, res) => {
  try {
    const { id } = req.params;
    const formation = await Formation.findByIdAndDelete(id);
    if (!formation) return res.status(404).json({ message: "Formation non trouvée" });
    res.json({ message: "Formation supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getFormations,
  getFormationById,
  createFormation,
  updateFormation,
  deleteFormation,
};
