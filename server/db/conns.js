const mongoose = require("mongoose");
const connectionString = process.env.ATLAS_URI;

mongoose.connect(connectionString);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("connected", () => {
  console.log("Database Connected");
});

module.exports = db;
