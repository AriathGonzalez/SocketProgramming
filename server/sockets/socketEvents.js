// TODO: When game created in /create, only allow playerCount into the game as well as those who entered the gamePIN.

/*
create-room (argument: room)
delete-room (argument: room)
join-room (argument: room, id)
leave-room (argument: room, id)*/

let users = [];

const messages = {
  general: [],
  random: [],
  jokes: [],
  javascript: [],
};

const handleJoinRoom = (socket, io) => {
  socket.on(`room-${roomNum}`, (gamePIN, username) => {
    io.to(`room-${roomNum}`).emit("some event");
    // Handle joining room
  });
};

const handleSubmitAnswer = (socket, io) => {
  socket.on("submitAnswer", (gamePIN, playerID, answer) => {
    // handle submitting answer
  });
};

const handleNextQuestion = (socket, io) => {
  socket.on("nextQuestion", (gamePIN) => {
    // handle next question
  });
};

const handleChat = (socket, io) => {
  socket.on("chat", (msg) => {
    console.log("console chat message: ", msg);
    io.emit("chat", msg);
  });
};

const handleDisconnect = (socket) => {
  socket.on("disconnect", () => {
    users = users.filter((u) => u.id !== socket.id);
    // If user disconnects, update list of users connected to room
    io.emit("Users now", users);
    console.log("A user disconnected");
  });
};

const useSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("join server", (username) => {
      const user = {
        username,
        id: socket.id,
      };

      users.push(user);
      io.emit("new user", users);
    });

    socket.on("join room", (roomName, cb) => {
      socket.join(roomName);
      cb(messeges[roomName]);
    });

    socket.on(
      "send message",
      ({ content, to, sender, chatName, isChannel }) => {
        if (isChannel) {
          const payload = {
            content,
            chatName,
            sender,
          };
          socket.to(to).emit("New message", payload);
        }
        // Private message
        else {
          const payload = {
            content,
            chatName: sender,
            sender,
          };
          socket.to(to).emit("New message", payload);
        }
        // to make sure room exists
        if (messages[chatName]) {
          // Update db, so late users can view chat history
          messages[chatName].push({
            sender,
            content,
          });
        }
      }
    );
    //socket.join(`room-${roomNum}`);
    //handleJoinRoom(socket, io);
    //handleSubmitAnswer(socket, io);
    //handleNextQuestion(socket, io);
    //handleChat(socket, io);
    handleDisconnect(socket);
  });
};

module.exports = {
  useSocket,
};
