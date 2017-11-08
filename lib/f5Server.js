const WebSocket = require('ws');


const fs = require('fs');

const wss = new WebSocket.Server({  
    port: 3000 //监听接口 
});


function f5Server (path) {
    fs.watch(path, {recursive: true}, function(){
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send("update");
            }
        });
    });
}

module.exports = f5Server;
