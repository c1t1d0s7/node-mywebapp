let maintenanceMode = false;

// Check health
function checkHealth(req, res) {
  if (maintenanceMode) {
    res.status(503).send('Service Unavailable - Under Maintenance');
  } else {
    res.status(200).send('OK');
  }
}

// Check maintenance mode 
function checkMaintenanceMode(req, res) {
  if (maintenanceMode) {
    // res.status(200).send('Enabled maintenance mode');
    res.status(200).send('Enabled');
  } else {
    // res.status(200).send('Disabled maintenance mode');
    res.status(200).send('Disabled');
  }
}

// Enable maintenance mode
function enableMaintenanceMode(req, res) {
  maintenanceMode = true;
  res.status(200).send('Set maintenance mode to enabled');
}

// Disable maintenance mode
function disableMaintenanceMode(req, res) {
  maintenanceMode = false;
  res.status(200).send('Set maintenance mode to disabled');
}

// Check uptime
function checkUptime(req, res) {
  // res.status(200).json({
  //   uptime: process.uptime()
  // });
  const uptime = process.uptime();
  res.status(200).send(uptime.toString());
}

module.exports = {
  checkHealth,
  checkMaintenanceMode,
  enableMaintenanceMode,
  disableMaintenanceMode,
  checkUptime
};
