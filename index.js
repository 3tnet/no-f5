#!/usr/bin/env node
const http = require('http');
const server = require('./lib/server');
const path = require('path');
const f5Server = require('./lib/f5Server');
const ips = require('./lib/getLocalIP');
const cp = require('child_process');

var program = require('commander');

program
    .option('-p, --prot <n>', '设置端口')
    .parse(process.argv);

let port = 8080;

if (program.prot) {
    port = program.prot;
}

const httpServer = http.createServer(server(process.cwd(), port));

httpServer.on('error', (err) => {
    console.log(err);
});
// 指定一个监听的接口
httpServer.listen(port, () => {
    console.log('runing...');
    for (const ip of ips) {
        console.log(`http://${ip}:${port}`);
    }
    // 打开默认浏览器
    cp.exec(`start http://localhost:${port}`);
});
// 监听文件是否改动
f5Server(process.cwd(), httpServer);

console.log(new Buffer('ICAgXyAgX19fX19fICAgICAgX19fX19fX18KICAvIHwvIC8gX18gXF9fX18vIF9fLyBfXy8KIC8gICAgLyAvXy8gL19fXy8gXy8vIF8gXCAKL18vfF8vXF9fX18vICAgL18vICBcX19fLyA=', 'base64').toString());

