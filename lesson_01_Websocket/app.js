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
/** define connection port */
const PORT = 8000;

/** start server */
server.listen(PORT, () => {
    console.log(`application is running on port: ${PORT}`);
});