/** import http module */
const express = require("express");

/** create application from express */
const app = express();

/** define connection port */
const PORT = 8000;

/** start server */
app.listen(PORT, () => {
    console.log(`application is running on port: ${PORT}`);
});
