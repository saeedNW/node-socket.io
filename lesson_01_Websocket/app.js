/** import http module */
const http = require("http");
/** import websocket */
const webSocket = require("ws");

/** create http server */
const server = http.createServer();

/** create websocket server */
const wss = new webSocket.Server({
    server,
});

/**
 * listen to websocket headers event
 * headers event returns handshake prosecc headers
 */
wss.on("headers", (headers, req) => {
    console.log(headers);
});

/**
 * listen to websocket connection event
 * connection events happens if user connected to the socket
 */
wss.on('connection', (socket, req) => {
    console.log("new soccket connected");

    /** listen to websocket client message even */
    socket.on('message', (msg) => {
        console.log(msg);

        /** send message to client */
        socket.send("Hi, welcome to my server");
    });
});

/** define connection port */
const PORT = 8000;

/** start server */
server.listen(PORT, () => {
    console.log(`application is running on port: ${PORT}`);
});