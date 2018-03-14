const fs = require('fs');
const path = require('path');
const ips = require('./getLocalIP');

function addClientJs(htmlString, port) {
    let scriptStr = fs.readFileSync(path.join(__dirname, '../public/autoF5.js'));
    let wsUrl = null;
    for (const ip of ips) {
        if (ip !== '127.0.0.1') {
            wsUrl = `${ip}:${port}`;
        }
    }
    return htmlString + `<script>var wsUrl = 'ws://${wsUrl ? wsUrl : '127.0.0.1:${port}'}';${scriptStr}</script>`;
}

module.exports = addClientJs;

