const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { nom, prenom, email, password, role } = req.body;

  try {
    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Configuration serveur: JWT_SECRET manquant" });
    }

    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return res.status(400).json({ message: "Utilisateur existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const allowPublicRole = process.env.ALLOW_PUBLIC_ROLE_ASSIGNMENT === "true";
    const safeRole = allowPublicRole ? role : undefined;

    await User.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role: safeRole
    });

    res.status(201).json({ message: "Inscription réussie" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Configuration serveur: JWT_SECRET manquant" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        nom: user.nom,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
