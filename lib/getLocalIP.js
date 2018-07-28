const os = require('os');
let ips = [];
const ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(function (dev) {
  ifaces[dev].forEach(function (details) {
    if (details.family === 'IPv4') {
      ips.push(details.address);
    }
  });
});

module.exports = ips;