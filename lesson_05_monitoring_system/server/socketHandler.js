module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('dataFromPc', (systemInfo) => {
            socket.computerId = systemInfo.networkMac.replaceAll(':', '-');
            systemInfo.id = socket.id;
            io.to('monitoring').emit('pcData', systemInfo);
        });

        socket.on('joinMonitoringRoom', () => {
            socket.join('monitoring')
        });

        socket.on('disconnect', () => {
            io.to('monitoring').emit('pcDisconnected', socket.computerId);
        });
    });
}