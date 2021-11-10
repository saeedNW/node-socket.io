const os = require('os');
const {io} = require("socket.io-client");
const socket = io("http://localhost:8000");

socket.on('connect', () => {
    setInterval(async () => {
        const systemInfo = await getSystemInfo();

        socket.volatile.emit('dataFromPc', systemInfo);
    }, 1000);
});

function getNetworkInfo() {
    for (const key in os.networkInterfaces()) {
        for (const value of os.networkInterfaces()[key]) {
            if (!value.internal && value.family === 'IPv4') {
                return {
                    ip: value.address,
                    mac: value.mac
                }
            }
        }
    }
}

function getCpuAverage() {
    let totalTime = 0;
    let idleTime = 0;
    const threadCount = os.cpus().length;

    for (const value of os.cpus()) {
        for (const key in value.times) {
            totalTime += value.times[key];
        }
        idleTime += value.times.idle;
    }

    return {
        totalTime: totalTime / threadCount,
        idleTime: idleTime / threadCount
    }
}

function getCpuLoad() {
    return new Promise((resolve, reject) => {
        const cpuStart = getCpuAverage();

        setTimeout(() => {
            const cpuEnd = getCpuAverage();
            const finalTotalTime = cpuEnd.totalTime - cpuStart.totalTime;
            const finalIdleTime = cpuEnd.idleTime - cpuStart.idleTime;
            const finalUseTime = finalTotalTime - finalIdleTime;
            resolve(Math.floor(finalUseTime * 100 / finalTotalTime))
        }, 500);
    });
}

function getSystemInfo() {
    return new Promise(async (resolve, reject) => {

        /** get os type */
        const os_type = (os.type() === 'Darwin') ? 'MacOS' : (os.type() === 'Windows_NT') ? 'Windows' : os.type();
        /** get network info (ip and mac address) */
        const networkIp = getNetworkInfo().ip;
        const netowrkMac = getNetworkInfo().mac;
        /** get memory (ram) info */
        const memoryTotal = Math.round(os.totalmem() / 1073741824);  // convert to GB => 1024 * 1024 * 1024 = 1073741824
        const memoryFree = Math.round(os.freemem() / 1073741824);
        const memoryUse = memoryTotal - memoryFree;
        const memoryUsagePercent = memoryUse * 100 / memoryTotal;
        /** get cpu info */
        const cpuModel = os.cpus()[0].model;
        const cpuSpeed = os.cpus()[0].speed;
        const cpuCores = os.cpus().length / 2;
        let cpuUsagePercent = await getCpuLoad();

        resolve({
            os_type, networkIp, netowrkMac, memoryTotal, memoryUsagePercent, cpuModel,
            cpuSpeed, cpuCores, cpuUsagePercent
        });

    });
}