const mongoose = require("mongoose");

const formationSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duree: {
      type: Number,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
   image:{
    type:String,
   }
    },
  { timestamps: true }
);

module.exports = mongoose.model("Formation", formationSchema);
