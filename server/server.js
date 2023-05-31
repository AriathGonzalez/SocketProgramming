require("dotenv").config();
require("./db/conns");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const routes = require("./routes/routes");
const { useSocket } = require("./sockets/socketEvents");
// set up rate limiter: maximum of eighty requests per minute
const RateLimit = require("express-rate-limit");

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 80,
});
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
}); // in case server and client run on different urls

app.use(limiter); // apply rate limiter to all requests
app.use(express.json());
app.use("/api", routes);

useSocket(io);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
