const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  units: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
  ],
});

module.exports = mongoose.model("Class", ClassSchema);
