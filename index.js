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

// 监听文件是否改动
f5Server(process.cwd());

const httpServer = http.createServer(server(process.cwd()));

// 指定一个监听的接口
httpServer.listen(port, function () {
    console.log('runing...');
    for (const ip of ips) {
        console.log(`http://${ip}:${port}`);
    }
    // 打开默认浏览器
    cp.exec(`start http://localhost:${port}`);
});

console.log('\n刷新是不可能刷新的，这辈子不可能刷新的\n');

