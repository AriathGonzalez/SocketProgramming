/*
// To connect with your mongoDB database
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/",
  {
    dbName: "yourDB-name",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log(err) : console.log("Connected to yourDB-name database")
);

// Schema for users of app
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("users", UserSchema);
User.createIndexes();

app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("User already register");
    }
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});
*/

const express = require("express");
const socketIo = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
}); // in case server and client run on different urls

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat", (msg) => {
    console.log("console chat message: ", msg);
    io.emit("chat", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
