import { io } from "socket.io-client";

const socket = io("localhost:5000/", {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Socket connected successfully");
});

export default socket;
