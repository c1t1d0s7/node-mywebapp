const os = require('os');

const MESSAGE = process.env.MESSAGE || 'Hello World!';

function getHostname(req, res) {
  res.status(200).json({
    hostname: os.hostname(),
    message: MESSAGE,
  });
}

module.exports = getHostname;

