function killServer(req, res) {
  console.log('Killing the server');
  res.status(200).send('Killed the server');
  process.exit(42);
}

module.exports = killServer;
