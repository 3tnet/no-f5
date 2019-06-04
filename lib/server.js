const url = require('url');
const path = require('path');
const mime = require('mime');
const proxy = require('http-proxy').createProxyServer({});

const filesLoad = require('./filesLoad');
const addClientJs = require('./addClientJs');

function createServer(rootPath, isWatch, targetUrl, forwardUrl) {
  return (request, response) => {
    const reqUrl = url.parse(request.url);
    let pathName = decodeURI(reqUrl.pathname);
    const reqPath = decodeURI(reqUrl.path);

    if (pathName.endsWith('/') || path.extname(pathName) === '') {
      // 自动显示当前目录下面的index.html
      // todos 遍历目录显示
      pathName = path.join(rootPath, pathName, 'index.html');
    } else {
      pathName = path.join(rootPath, pathName);
    }
    try {
      let file = filesLoad(pathName);
      const extname = path.extname(pathName).substr(1);
      response.writeHead(200, {'Content-Type': `${mime.getType(extname)};charset=UTF-8`});
      if (isWatch && extname === 'html') {
        file = addClientJs(file)
      }
      response.write(file, 'binary');
      response.end();
    } catch (err) {
      // 代理
      if (targetUrl && err.code === 404 && reqPath.startsWith(forwardUrl)) {
        proxy.web(request, response, {xfwd: false, changeOrigin: true, target: targetUrl});
        return;
      }
      response.writeHead(err.code || 500, {'Content-Type': 'text/html;charset=UTF-8'});
      response.write(err.message);
      response.end();
    }
  };
}

module.exports = createServer;
