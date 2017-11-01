const fs   = require('fs');
const path = require('path');

function addClientJs(htmlString){
    let scriptStr = fs.readFileSync(path.join(__dirname, '../public/autoF5.js'));
    return htmlString + '<script>' + scriptStr + '</script>';
}
module.exports = addClientJs;

