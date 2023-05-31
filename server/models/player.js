const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Player", playerSchema);
