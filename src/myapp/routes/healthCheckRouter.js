const express = require('express');
const router = express.Router();
const {
  checkHealth,
  checkMaintenanceMode,
  enableMaintenanceMode,
  disableMaintenanceMode,
  checkUptime
} = require('../controllers/healthCheckController');

router.get('/', checkHealth);
router.get('/maintenance', checkMaintenanceMode);
router.post('/maintenance/enable', enableMaintenanceMode);
router.post('/maintenance/disable', disableMaintenanceMode);
router.get('/uptime', checkUptime);

module.exports = router;
