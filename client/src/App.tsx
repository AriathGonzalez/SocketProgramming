import { io } from "socket.io-client";
import { Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";

import JoinGame from "./components/join/JoinGame";
import CreateGame from "./components/create/CreateGame";
import GameLobby from "./components/lobby/GameLobby";
import UsernameSelection from "./components/username/UsernameSelection";
import NotFound from "./components/error/NotFound";

import "./App.scss";

export default function App() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [socketInstance, setSocketInstance] = useState<any>("");

  const handleText = (e: any) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    socketInstance.emit("chat", message);
    setMessage("");
  };

  const handleChatMessage = (chat: string) => {
    setMessages((messages) => [...messages, chat]);
  };

  useEffect(() => {
    // create websocket/connect
    const socket = io("localhost:5000/", {
      transports: ["websocket"],
      withCredentials: true,
    });

    setSocketInstance(socket);

    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("chat", handleChatMessage);

    socket.on("disconnect", (data: any) => {
      console.log(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Note: Look up nested routing.
  return (
    <Routes>
      <Route path="/" element={<JoinGame />} />
      <Route path="/create" element={<CreateGame />} />
      <Route path="/lobby" element={<GameLobby />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// <Route path="lobby/:gamePIN" element={<GameLobby />} />;
