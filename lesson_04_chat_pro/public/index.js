$(document).ready(function () {
    /** client socket connection */
    const socket = io('http://localhost:8000');
    /** client namespace socket connection */
    let nsSocket = null;

    /** socket event listener for connection */
    socket.on("connect", () => {
        /** socket event listener for getting namespaces info */
        socket.on('nameSpaceLoad', (NSData) => {
            $('.groupLists').html('');

            NSData.forEach((namespace) => {
                $('.groupLists').append(`<div class="btnJoin mt-2 joinNameSpace" ns="${namespace.endpoint}">${namespace.title}</div>`);
            });

            joinNamespace(NSData[0].endpoint);
        });
    });

    $(document).on('click', '.joinNameSpace', function () {
        joinNamespace($(this).attr('ns'));
    });

    function joinNamespace(endpoint) {
        /** close connection from previous namespace socket connection */
        if (nsSocket) {
            nsSocket.close();
        }

        nsSocket = io(`http://localhost:8000${endpoint}`);

        /** socket event listener for getting namespace rooms info */
        nsSocket.on('roomLoad', (roomsData) => {
            $('.roomsLists').html('');

            roomsData.forEach((room) => {
                $('.roomsLists').append(`<div class="btnJoin mt-2 joinRoom" roomName="${room.name}">${room.title}</div>`);
            });

            joinRoom(roomsData[0].name);
        });
    }

    $(document).on('click', '.joinRoom', function () {
        joinRoom($(this).attr('roomName'));
    });

    function joinRoom(roomName) {
        /** socket event emitter for room connection confirm */
        nsSocket.emit('joinRoom', roomName);

        /** remove soket event */
        nsSocket.off('roomInfo');

        /** socket event listener for room info */
        nsSocket.on('roomInfo', (roomInfo) => {
            $('.roomName').html(roomInfo.title)
        });

        /** socket event listener for updating online users count to an spesecif endpoint and room */
        nsSocket.on('onlineUsers', (onlineUsers) => {
            $('.onlineCount').html(onlineUsers);
        })
    }
});