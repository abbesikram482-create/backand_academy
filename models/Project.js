const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    technologies: {
      type: [String],
      default: [],
    },
    difficulte: {
      type: String,
      enum: ["Débutant", "Intermédiaire", "Avancé", "Expert"],
      default: "Intermédiaire",
    },
    lienGithub: {
      type: String,
    },
    lienDemo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
