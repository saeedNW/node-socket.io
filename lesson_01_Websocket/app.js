/** import http module */
const http = require("http");

/** create http server */
const server = http.createServer();

/** define connection port */
const PORT = 8000

/** start server */
server.listen(PORT, () => {
    console.log(`application is running on port: ${PORT}`)
});