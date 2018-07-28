var wsServer = new WebSocket('ws://' + window.location.host);

wsServer.onmessage = function (e) {
    setTimeout(function () {
        location.reload();
    }, 100);
    wsServer.onmessage = function(){}
};
window.addEventListener('beforeunload', function () {
    wsServer.close();
});