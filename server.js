const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
require("dotenv").config();


console.log('Env:', process.env.NODE_ENV)
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? "https://poker-a-plan.herokuapp.com" : "http://localhost:3000",
        // origin: "https://poker-a-plan.herokuapp.com",
        methods: ["GET", "POST"],
    }
});
const PORT = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, "./client/build")));

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