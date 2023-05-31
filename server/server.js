// Game Session:
// id, gradeLevel, playerCount, gamePin
// Player:
// id, username
require("dotenv").config();
require("./db/conns");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const routes = require("./routes/posts");
const { useSocket } = require("./sockets/socketEvents");

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
}); // in case server and client run on different urls

app.use(express.json());
app.use("/api", routes);

useSocket(io);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
