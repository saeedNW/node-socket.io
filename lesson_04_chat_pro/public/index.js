$(document).ready(function () {
    const userName = prompt('enter your name');

    /** client socket connection */
    const socket = io('http://localhost:8000', {
        query: {
            userName
        }
    });
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
        nsSocket.off('onlineUsers');
        nsSocket.off('newMessage');

        /** socket event listener for room info */
        nsSocket.on('roomInfo', (roomInfo) => {
            $('.roomName').html(roomInfo.title)
            $('.chatBox').html('');
            roomInfo.history.forEach((message) => {
                $('.chatBox').append(`
                    <div class="messageBox">
                        <img src="${message.avatar}">
                        <p class="font-weight-bold userName">${message.userName}</p>
                        <p>${message.text}</p>
                        <span class="time">${message.time}</span>
                    </div>
                `);
            });
        });

        /** socket event listener for updating online users count to an spesecif endpoint and room */
        nsSocket.on('onlineUsers', (onlineUsers) => {
            $('.onlineCount').html(onlineUsers);
        });

        /** socket event listener for receiving new message */
        nsSocket.on('newMessage', (message) => {
            $('.chatBox').append(`
                <div class="messageBox">
                    <img src="${message.avatar}">
                    <p class="font-weight-bold userName">${message.userName}</p>
                    <p>${message.text}</p>
                    <span class="time">${message.time}</span>
                </div>
            `);
        });
    }

    $('.sendBtn').click(() => {
        const messageInput = $('.messageInput')
        const messageText = messageInput.val();

        /** socket event emitter for sending new message */
        nsSocket.emit('newMessage', messageText);

        messageInput.val('');
    })
});