var wsServer = new WebSocket(wsUrl);

wsServer.onmessage = function (e) {
    location.reload();
    wsServer.onmessage = function(){}
};