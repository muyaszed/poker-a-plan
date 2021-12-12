const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
    console.log('Websocket connection establish');

    socket.on('join', ({ sessionId, sessionName, name}, callback) => {
        socket.emit('welcome', {
            text: `Welcome to ${sessionName}. ${name}`,
        })
        socket.join(sessionId);
        callback(null);
    });

    socket.on('disconnect', ()=> {
        console.log('Websocket disconnected')
    });
})

server.listen(PORT, () => console.log("Server is now connected to " + PORT))