const Project = require("../models/Project");

const ajouterProjet = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image = `projets/${req.file.filename}`;
    }

    if (payload.technologies && typeof payload.technologies === "string") {
      payload.technologies = payload.technologies.split(",").map((s) => s.trim());
    }

    const projet = await Project.create(payload);
    res.status(201).json(projet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listerProjets = async (req, res) => {
  try {
    const projets = await Project.find();
    res.json(projets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const modifierProjet = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.file) {
      payload.image = `projets/${req.file.filename}`;
    }

    if (payload.technologies && typeof payload.technologies === "string") {
      payload.technologies = payload.technologies.split(",").map((s) => s.trim());
    }

    const projet = await Project.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );
    if (!projet) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }
    res.json(projet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const supprimerProjet = async (req, res) => {
  try {
    const projet = await Project.findByIdAndDelete(req.params.id);
    if (!projet) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }
    res.json({ message: "Projet supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ajouterProjet,
  listerProjets,
  modifierProjet,
  supprimerProjet
};
