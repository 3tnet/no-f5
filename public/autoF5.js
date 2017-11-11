var wsServer = new WebSocket(wsUrl);

wsServer.onmessage = function (e) {
    setTimeout(function () {
        location.reload();
    }, 10);
    wsServer.onmessage = function(){}
};