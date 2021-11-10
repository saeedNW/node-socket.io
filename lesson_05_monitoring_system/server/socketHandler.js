module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('dataFromPc', (systemInfo) => {
            console.log(systemInfo)
        })
    });
}