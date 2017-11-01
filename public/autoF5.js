
var wsServer = new WebSocket('ws://127.0.0.1:3000');

wsServer.onmessage = function (e) {
    location.reload();
};