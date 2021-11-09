$(document).ready(function () {
    /** client socket connection */
    const socket = io('http://localhost:8000');
    /** client namespace socket connection */
    let NSsocket = null;

    /** socket event listener for connection */
    socket.on("connect", () => {
        /** socket event listener for getting namespaces info */
        socket.on('nameSpaceLoad', (NSData) => {
            $('.groupLists').html('')
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
        NSsocket = io(`http://localhost:8000${endpoint}`);
    }
});