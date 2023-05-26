import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function App() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [socketInstance, setSocketInstance] = useState<any>("");

  const handleText = (e: any) => {
    console.log("Handle Text");
    console.log(e.target.value);
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Handle submit: ", message);
    socketInstance.emit("chat", message);
    setMessage("");
  };

  const handleChatMessage = (chat: string) => {
    setMessages((messages) => [...messages, chat]);
  };

  useEffect(() => {
    console.log("Creating socket...");
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
      console.log("disconnect");
      console.log(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("chat", handleChatMessage);
    };
  }, []);

  return (
    <div>
      <div>
        {messages.map((message, ind) => (
          <div key={ind}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={message} onChange={handleText} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
