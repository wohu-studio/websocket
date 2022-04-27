import { Server } from "Socket.IO";
import { addUser, getUser, deleteUser } from "../../users";
import Cors from "cors";
import initMiddleware from "../../middleware/inital";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
    origin: true,
  })
);

const SocketHandler = async (req, res) => {
  await cors(req, res);
  console.log("req: ", req);

  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end();
};

export default SocketHandler;
