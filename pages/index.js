import { useEffect, useState } from "react";
import io from "socket.io-client";
// import { Button } from "@mui/material";

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
  };

  const handleSubmit = () => {
    socket.emit("changeOrder", "Order:1001");
  };

  return (
    <>
      <h1>Headoffice</h1>
      <button onClick={handleSubmit}>submit</button>
    </>
  );
};

export default Home;
