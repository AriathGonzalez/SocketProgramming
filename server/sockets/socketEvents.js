const handleChat = (socket, io) => {
  socket.on("chat", (msg) => {
    console.log("console chat message: ", msg);
    io.emit("chat", msg);
  });
};

const handleDisconnect = (socket) => {
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
};

const useSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    handleChat(socket, io);
    handleDisconnect(socket);
  });
};

module.exports = {
  useSocket,
};
