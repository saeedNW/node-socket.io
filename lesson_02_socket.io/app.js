/** import http module */
const http = require("http");

/** import socket.io */
const socketIo = require("socket.io")

/** create http server */
const server = http.createServer();

/** create websocket server */
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
    console.log("new soccket connected");

    /** lesson to client welcome event */
    socket.on("welcome", (msg) => {
        console.log(msg);
    })

    /** send a welcome reply to client */
    socket.emit("welcome reply", "Hi, welcome to my server");
});

/** define connection port */
const PORT = 8000;

/** start server */
server.listen(PORT, () => {
    console.log(`application is running on port: ${PORT}`);
});