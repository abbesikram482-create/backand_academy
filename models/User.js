const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "etudiant", "formateur"],
    default: "etudiant"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
