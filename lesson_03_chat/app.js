/** import http module */
const express = require("express");
/** import socket.io */
const socketIo = require("socket.io");

/** create application from express */
const app = express();

/** define express static */
app.use(express.static(__dirname + '/public'));

/** define connection port */
const PORT = 8000;

/** start server */
const server = app.listen(PORT, () => {
    console.log(`application is running on port: ${PORT}`);
});

/** create socket.io server */
const io = socketIo(server, {
    cors: {
        origin: '*'
    }
});

/**
 * listen to socket.io connection event
 * connection events happens if user connected to the socket
 */
io.on('connection', (socket) => {
    console.log("new socket connected" + socket.id);

    /** socket event listener for getting messages */
    socket.on("chat_message", msg => {
        /** socket event emitter for sending received message to everyone */
        io.emit("chat_message", msg);
    })
});

