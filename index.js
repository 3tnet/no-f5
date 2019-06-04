#!/usr/bin/env node
const http = require('http');
const opn = require('opn');
const program = require('commander');
const ips = require('./lib/getLocalIP');

const createServer = require('./lib/server');
const f5Server = require('./lib/f5Server');

program
  .option('-p, --port <n>', '设置端口')
  .option('-o, --only', '仅开启http服务')
  .option('-f, --forward <url>', '欲代理url')
  .option('-t, --target <url>', '代理目标url')
  .parse(process.argv);

const port = program.port || 8080;
const isWatch = !program.only;
const targetUrl = program.target;
const forwardUrl = program.forward || '/';


const server = http.createServer(createServer(process.cwd(), isWatch, targetUrl, forwardUrl));

server.on('error', (err) => {
  console.log(err);
});

server.listen(port, () => {
  console.log('runing...');
  for (const ip of ips) {
    console.log(`http://${ip}:${port}`);
  }
  // 打开浏览器
  opn(`http://localhost:${port}`);
});

if (isWatch) {
  f5Server(process.cwd(), server);
}

console.log(Buffer.from('ICAgXyAgX19fX19fICAgICAgX19fX19fX18KICAvIHwvIC8gX18gXF9fX18vIF9fLyBfXy8KIC8gICAgLyAvXy8gL19fXy8gXy8vIF8gXCAKL18vfF8vXF9fX18vICAgL18vICBcX19fLyA=', 'base64').toString());

process.on('uncaughtException', () => {});