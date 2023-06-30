// TODO: Change api call to only accept local url, instead of http:localhost:5000/...

const axios = require("axios");

const getPlayers = async (gamePIN) => {
  const { data: response } = await axios.get(
    `http://localhost:5000/api/player/${gamePIN}`
  );
  return response;
};

const postGame = async (gradeLevel, maxPlayerCount) => {
  const data = {
    gradeLevel: gradeLevel,
    maxPlayerCount: maxPlayerCount,
  };

  try {
    const { data: res } = await axios.post(
      "http://localhost:5000/api/game",
      data
    );
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

const postPlayer = async (username, gamePIN) => {
  const data = {
    username: username,
    gamePIN: gamePIN,
  };

  try {
    console.log("In postPlayer: Before get game");
    const { data: gameRes } = await axios.get(
      `http://localhost:5000/api/game/${gamePIN}`
    );
    const currentPlayerCount = gameRes[0].currentPlayerCount;
    const maxPlayerCount = gameRes[0].maxPlayerCount;
    console.log(gameRes[0]);

    if (currentPlayerCount + 1 <= maxPlayerCount) {
      const updatedData = {
        currentPlayerCount: currentPlayerCount + 1,
      };
      try {
        await axios.patch(
          `http://localhost:5000/api/game/${gamePIN}`,
          updatedData
        );
      } catch (error) {
        console.log(error.message);
      }
      const res = await axios.post("http://localhost:5000/api/player", data);
    }
  } catch (error) {
    console.error(error.message);
  }
};

const handleDisconnect = (socket) => {
  socket.on("disconnect", (room) => {
    console.log("A user disconnected");
  });
};

const useSocket = (io) => {
  io.on("connection", async (socket) => {
    console.log("A user connected");

    socket.on("createGame", async (data) => {
      try {
        const game = await postGame(data.gradeLevel, data.maxPlayerCount);
        socket.emit("gameCreated", {
          message: "Game created successfully",
          gamePIN: game.gamePIN,
        });
      } catch (error) {
        socket.emit("gameCreationError", {
          error: "Failed to create the game",
        });
      }
    });

    socket.on("joinGame", async (data) => {
      try {
        await postPlayer(data.username, data.gamePIN);

        const players = await getPlayers(data.gamePIN);
        const playerCount = Object.keys(players).length;

        socket.broadcast.emit("gameJoined", {
          message: "Game joined successfully",
          players: players,
          playerCount: playerCount,
        });
      } catch (error) {
        socket.emit("gameJoinError", { error: "Failed to join the game" });
      }
    });

    handleDisconnect(socket);
  });
};

module.exports = {
  useSocket,
};
