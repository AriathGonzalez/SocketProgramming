const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  gamePIN: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Player", playerSchema);
