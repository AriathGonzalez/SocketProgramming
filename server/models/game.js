const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gradeLevel: {
    required: true,
    type: Number,
  },
  currentPlayerCount: {
    required: true,
    type: Number,
    default: 0,
  },
  maxPlayerCount: {
    required: true,
    type: Number,
  },
  gamePIN: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Game", gameSchema);
