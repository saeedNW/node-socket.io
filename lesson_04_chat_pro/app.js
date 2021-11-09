/** import http module */
const express = require("express");
/** import socket.io */
const socketIo = require("socket.io");
/** import socket structure */
const structure = require("./socket/structure");

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
    /** save namespaces data */
    const nsDate = structure.map((namespace) => {
        return {
            title: namespace.title,
            endpoint: namespace.endpoint
        }
    });

    /** socket event emitter for sending namespaces info to connected socket */
    socket.emit('nameSpaceLoad', nsDate);
});

/** loop over namespaces */
structure.forEach((namespace) => {
    /**
     * listen to socket.io connection event for each namespace
     * connection events happens if user connected to the socket namespace
     */
    io.of(namespace.endpoint).on('connection', (nsSocket) => {
        /** socket event emitter for sending namespaces rooms info to connected socket */
        nsSocket.emit('roomLoad', namespace.rooms);

        /** socket event listener for room connection confirm */
        nsSocket.on('joinRoom', (roomName) => {
            /** get user last connected room name */
            const lastRoom = Array.from(nsSocket.rooms)[1];

            /** disconnect socket from last connected room */
            nsSocket.leave(lastRoom);

            /** update online users count */
            updateOnlineUsers(namespace.endpoint, lastRoom);

            /** nsSocket room connection */
            nsSocket.join(roomName);

            /** update online users count */
            updateOnlineUsers(namespace.endpoint, roomName);

            /** get room info */
            const roomInfo = namespace.rooms.find((room) => {
                return room.name === roomName
            });

            /** send room info to client */
            nsSocket.emit('roomInfo', roomInfo);
        });

        nsSocket.on('disconnecting', ()=>{
            /** get user last connected room name */
            const lastRoom = Array.from(nsSocket.rooms)[1];

            /** disconnect socket from last connected room */
            nsSocket.leave(lastRoom);

            /** update online users count */
            updateOnlineUsers(namespace.endpoint, lastRoom);
        })
    })
})

async function updateOnlineUsers(endpoint, roomName) {
    /** socket method for geting all online users for an spesecif endpoint and room */
    const onlineUsers = await io.of(endpoint).in(roomName).allSockets();

    /** socket event emitter for sending online users count to an spesecif endpoint and room */
    io.of(endpoint).in(roomName).emit('onlineUsers', Array.from(onlineUsers).length);
}
