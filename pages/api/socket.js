import { Server } from "socket.io";
import { addUser, getUser, deleteUser } from "../../users";
import Cors from "cors";
import initMiddleware from "../../middleware/initMiddleware";

const SocketHandler = async (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    //const io = new Server(res.socket.server);
    const io = new Server(res.socket.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("changeOrder", (orderNumber) => {
        socket.broadcast.emit("updateMessage", `${orderNumber} has been updated. Please refresh the page.`);
      });

      // socket.on("joinRoom", ({ username, roomname }) => {
      //   //* create user
      //   const p_user = addUser(socket.id, username, roomname);
      //   console.log("socket.id: ", socket.id);
      //   socket.join(p_user.room);

      //   //display a welcome message to the user who have joined a room
      //   socket.emit("message", {
      //     userId: p_user.id,
      //     username: p_user.username,
      //     text: `Welcome ${p_user.username}`,
      //   });

      //   //displays a joined room message to all other room users except that particular user
      //   socket.broadcast.to(p_user.room).emit("message", {
      //     userId: p_user.id,
      //     username: p_user.username,
      //     text: `${p_user.username} has joined the chat`,
      //   });
      // });
    });
  }
  res.json({ message: "Hello Everyone!" });
  res.end();
};

export default SocketHandler;
