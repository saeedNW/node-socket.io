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

