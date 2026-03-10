const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ==========================
// Ajouter utilisateur
// ==========================
exports.ajouterUtilisateur = async (req, res) => {
  try {
    const { nom, prenom, email, password, role } = req.body;

    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: "Utilisateur ajouté avec succès" });
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de l'ajout",
      error: error.message,
    });
  }
};

// ==========================
// Lister utilisateurs
// ==========================
exports.listerUtilisateurs = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération",
      error: error.message,
    });
  }
};
