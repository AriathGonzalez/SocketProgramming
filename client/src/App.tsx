import { Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";

import JoinGame from "./components/join/JoinGame";
import CreateGame from "./components/create/CreateGame";
import GameLobby from "./components/lobby/GameLobby";
import UsernameSelection from "./components/username/UsernameSelection";
import NotFound from "./components/error/NotFound";

import "./App.scss";
import socket from "./components/socket";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  // Note: Look up nested routing.
  return (
    <Routes>
      <Route path="/" element={<JoinGame />} />
      <Route path="/username" element={<UsernameSelection />} />
      <Route path="/create" element={<CreateGame />} />
      <Route path="/lobby" element={<GameLobby />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
