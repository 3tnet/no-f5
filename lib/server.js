const url = require('url');
const path = require('path');
const filesLoad = require('./filesLoad');

let publicPath = '';
function serverController(request, response){
    let pathName = url.parse(request.url).pathname;
    //对路径解码，防止中文乱码
    pathName = decodeURI(pathName);
    
    if (pathName.endsWith('/') ||  path.extname(pathName) === '') {
        // 自动显示当前目录下面的index.html
        pathName = path.join(publicPath, pathName, 'index.html');
    }else {
        pathName = path.join(publicPath, pathName);
    }
    filesLoad(pathName, request, response);
}

function server (root){
    publicPath = root;
    return serverController;
}

module.exports = server;
