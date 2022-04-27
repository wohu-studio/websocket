import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io();

const Home = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    const response = await fetch("/api/socket");
    console.log("response: ", response);

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
    console.log("socket: ", socket);
  };

  return <input placeholder="Type something" value={input} onChange={onChangeHandler} />;
};

export default Home;
