const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gradeLevel: {
    required: true,
    type: Number,
  },
  playerCount: {
    required: true,
    type: Number,
  },
  gamePIN: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Game", gameSchema);
