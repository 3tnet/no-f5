const WebSocket = require('ws');
const fs = require('fs');

let wss = null;

function f5Server(path, httpServer) {
  if (!wss) {
    wss = new WebSocket.Server({server: httpServer});
  }
  fs.watch(path, {recursive: true}, () => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("update");
      }
    });
  });
}

module.exports = f5Server;
