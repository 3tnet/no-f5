const fs = require('fs');
const mime = require('mime');
const path = require('path');
const addClientJs = require('./addClientJs');

function filesLoad(filePath, req, res) {
    const extname = path.extname(filePath).substr(1);
    if (!fs.existsSync(filePath)) {
        res.writeHead(404, {'Content-Type': 'text/plain;charset=UTF-8'});
        res.write("404 页面没找到！");
        res.end();
    } else {
        fs.readFile(filePath, 'binary', function (err, file) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain;charset=UTF-8'});
                res.write("500 文件打开错误！");
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': `${mime.getType(extname)};charset=UTF-8`});
                // 在html网页中添加自动刷新的客户端代码
                if (extname === 'html') {
                    file = addClientJs(file);
                }
                res.write(file, 'binary');
                res.end();
            }
        });
    }
}

module.exports = filesLoad;
