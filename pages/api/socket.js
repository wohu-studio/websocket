import { Server } from "socket.io";
import { addUser, getUser, deleteUser } from "../../users";
import Cors from "cors";
import initMiddleware from "../../middleware/initMiddleware";

// Initialize the cors middleware
const cors = Cors({
  methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
  origin: "*",
  withCredentials: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const SocketHandler = async (req, res) => {
  await runMiddleware(req, res, cors);
  console.log("req: ", req);

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
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  res.json({ message: "Hello Everyone!" });
  res.end();
};

export default SocketHandler;
