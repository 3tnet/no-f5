const fs = require('fs');

function filesLoad(filePath) {
  if (!fs.existsSync(filePath)) {
    throw {code: 404, message: '404 页面没找到！'};
  }
  return fs.readFileSync(filePath, 'binary');
}

module.exports = filesLoad;
