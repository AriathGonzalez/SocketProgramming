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
  /*
  const [socketInstance, setSocketInstance] = useState<any>("");

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

    // socket.on("chat", handleChatMessage);

    socket.on("disconnect", (data: any) => {
      console.log(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);*/

  // const [username, setUsername] = useState("");
  // const [connected, setConnected] = useState(false);
  // const [currentChat, setCurrentChat] = useState({
  //   isChannel: true,
  //   chatName: "general",
  //   receiverId: "",
  // });
  // const [connectedRooms, setConnectedRooms] = useState(["general"]);
  // const [allUsers, setAllUsers] = useState([]);
  // const [messages, setMessages] = useState(initialMessageState);
  // const [message, setMessage] = useState("");
  // const socketRef = useRef();

  // const handleMessageChange = (e: any) => {
  //   setMessage(e.target.value)
  // }

  // const sendMessage = () => {
  //   const payload = {
  //     content: message,
  //     to: currentChat.isChannel ? currentChat.chatName : currentChat.receiverId,
  //     sender: username,
  //     chatName: currentChat.chatName,
  //     isChannel: currentChat.isChannel
  //   }
  //   socketRef.current.emit("send message", payload)
  //   newMessage = ...
  //   setMessages(newMessage);
  // }

  /*
  const joinRoom = (room: any) => {
    // push room to db
    const newConnectedRooms = ...
    socketRef.current.emit("join room", room, (messages) => roomJoinCallback(messages, room))
    setConnectedRooms(newConnectedRooms)
  }

  // Show all the previous messages of the room client joins
  const roomJoinCallback = (incomingMessages, room) => {
    const newMessages = ...
    setMessages(newMessages)
  }*/

  // const toggleChat = (currentChat) => {
  //   if (!messages[currentChat.chatName]){
  //     const newMessages = ...
  //     setMessages(newMessages);
  //   }
  //   setCurrentChat(currentChat)
  // }

  //  const handleChange = (e: any) => {
  //   setUsername(e.target.value)
  // }

  /*
  const connect = () => {
    setConnected(true)
    socketRef.current = io.connect("/")
    socketRef.current.emit("join server", username)
    socketRef.current.emit("join room", "general", (messages) => roomJoinCallback(messages, "general"))
    socketRef.current.on("new user", allUsers) => {
      setAllUsers(allUsers)
    }
    socketRef.current.on("new message", ({content, sender, chatName}) => {
      setMessage()
    })
  }*/

  // let body;
  // if (connected) {
  //   body = (
  //     <Chat
  //       message={message}
  //       handleMessageChange={handleMessageChange}
  //       sendMessage={sendMessage}
  //       yourId={socketRef.current ? socketRef.current.id : ""}
  //       allUsers={allUsers}
  //       joinRoom={joinRoom}
  //       connectedRooms={connectedRooms}
  //       currentChat={currentChat}
  //       toggleChat={toggleChat}
  //       messages={messages[currentChat.chatname]}
  //     />
  //   );
  // }
  // else {
  //   body = {
  //     <Form username={username} onChange={handleChange} connect={connect}/>
  //   }
  // }

  // useEffect(() => {
  //   setMessage("")
  // }, [messages])

  /*
    Following is previous code before adding the code from the video.
  */

  // const [message, setMessage] = useState<string>("");
  // const [messages, setMessages] = useState<string[]>([]);
  // const [socketInstance, setSocketInstance] = useState<any>("");

  // const handleText = (e: any) => {
  //   const inputMessage = e.target.value;
  //   setMessage(inputMessage);
  // };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   socketInstance.emit("chat", message);
  //   setMessage("");
  // };

  // const handleChatMessage = (chat: string) => {
  //   setMessages((messages) => [...messages, chat]);
  // };

  // useEffect(() => {
  //   // create websocket/connect
  //   const socket = io("localhost:5000/", {
  //     transports: ["websocket"],
  //     withCredentials: true,
  //   });

  //   setSocketInstance(socket);

  //   socket.on("connect", () => {
  //     console.log(socket.id);
  //   });

  //   socket.on("connect_error", () => {
  //     setTimeout(() => socket.connect(), 5000);
  //   });

  //   socket.on("chat", handleChatMessage);

  //   socket.on("disconnect", (data: any) => {
  //     console.log(data);
  //   });

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // Note: Look up nested routing.
  return (
    <Routes>
      <Route path="/" element={<JoinGame />} />
      <Route path="/create" element={<CreateGame />} />
      <Route path="/lobby" element={<GameLobby />} />
      <Route path="/username" element={<UsernameSelection />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// <Route path="lobby/:gamePIN" element={<GameLobby />} />;
