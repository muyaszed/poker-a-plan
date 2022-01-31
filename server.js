const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { addUser, getUsers, removeUser, updateUser } = require("./user");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_BACK_END_POINT
        : "http://localhost:3003",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, "./client/build")));

io.on("connection", (socket) => {
  console.log("Websocket connection establish");
  socket.on(
    "join",
    ({ sessionId, sessionName, name, admin, viewOnly }, callback) => {
      const { user, error } = addUser({
        id: socket.id,
        name,
        room: sessionId,
        admin,
        viewOnly,
      });

      if (error) return callback(error);

      socket.join(sessionId);

      socket.emit("welcome", {
        user,
        text: `Welcome ${name}`,
      });

      io.in(sessionId).emit("all-users", getUsers(sessionId));

      callback(null);
    }
  );
  socket.on("user-select", ({ userSelection, sessionId }, callback) => {
    updateUser(socket.id, userSelection);
    io.in(sessionId).emit("all-users", getUsers(sessionId));
    callback(null);
  });

  socket.on("request-show-result", ({ sessionId }, callback) => {
    io.in(sessionId).emit("show-result", {
      showResult: true,
    });

    callback(null);
  });

  socket.on("disconnect", () => {
    console.log("Websocket disconnected");
    const user = removeUser(socket.id);
    if (user) {
      io.in(user.room).emit("all-users", getUsers(user.room));
    }
  });
});

server.listen(PORT, () => console.log("Server is now connected to " + PORT));
