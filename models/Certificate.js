const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
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
    institution: {
      type: String,
      required: true,
    },
    duree: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
