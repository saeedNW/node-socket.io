/** import cluster module */
const cluster = require('cluster');
/** import os module */
const os = require('os');
/** import farmhash module */
const farmhash = require('farmhash');
/** import net module */
const net = require('net');
/** import express module */
const express = require('express');
/** import express module */
const process = require('process');

/** get countof cpu threads */
const threadCount = os.cpus().length;

/** define connection port */
const PORT = 8000;

if (cluster.isMaster) {
    // master node

    /**
     * worker nodes list
     * @type {*[]}
     */
    const workers = [];

    const spawnWorker = (i) => {
        workers[i] = cluster.fork();
        workers[i].on('exit', (code, signal) => {
            console.log(`worker ${workers[i].process.pid} died`);
            spawnWorker(i);
        })
    }

    for (let i = 0; i < threadCount; i++) {
        spawnWorker(i);
    }

    let getWorkerIndex = (ip) => {
        console.log(farmhash.fingerprint32(ip), farmhash.fingerprint32(ip) % threadCount)
        return farmhash.fingerprint32(ip) % threadCount;
    }

    /** create master server */
    net.createServer({pauseOnConnect: true}, (connection) => {
        let worker = workers[getWorkerIndex(connection.remoteAddress)];
        worker.send('sticky-session:connection', connection);
    }).listen(PORT, () => {
        console.log(`application is running on port: ${PORT}`);
        console.log(`Primary ${process.pid} is running`);
    });

} else {
    // worker node

    /** create application from express */
    const app = express();

    /**
     * start worker server
     * setting port to 0 means to use master port witch is 8000
     */
    const server = app.listen(0, 'localhost', () => {
        console.log(`Worker ${process.pid} started`)
    });

    /** define express static */
    app.use(express.static(__dirname + '/public'));

    /** create http connection between master and workder */
    process.on('message', (message, connection) => {
        if (message !== 'sticky-session:connection') {
            return false
        }

        server.emit('connection', connection);
        connection.resume();
    })
}