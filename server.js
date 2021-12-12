const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
    console.log('Websocket connection establish');
})

server.listen(PORT, () => console.log("Server is now connected to " + PORT))