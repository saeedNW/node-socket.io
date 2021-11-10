module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('dataFromPc', (systemInfo) => {
            systemInfo.id = socket.id;
            io.to('monitoring').emit('pcData', systemInfo);
        });

        socket.on('joinMonitoringRoom', () => {
            socket.join('monitoring')
        });
    });
}