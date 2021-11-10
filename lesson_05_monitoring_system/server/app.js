/** import cluster module */
const cluster = require('cluster');
/** import os module */
const os = require('os');
/** import farmhash module */
const farmhash = require('farmhash');
/** import net module */
const net = require('net');

/** get countof cpu threads */
const threadCount = os.cpus().length;

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
            spawnWorker(i);
        })
    }

    for (let i = 0; i < threadCount; i++) {
        spawnWorker(i);
    }

    let getWorkerIndex = (ip) => {
        return farmhash.fingerprint32(ip) % threadCount;
    }

    net.createServer({pauseOnConnect : true}, (connection)=>{
        let worker = workers[getWorkerIndex(connection.remoteAddress)];
        worker.send('sticky-session:connection', connection);
    }).listen(8000);

} else {
    // worker node



}