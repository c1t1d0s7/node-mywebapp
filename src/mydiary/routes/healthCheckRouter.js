const express = require('express');
const router = express.Router();

const { checkHealth, checkMaintenanceMode, enableMaintenanceMode, disableMaintenanceMode, checkUptime, checkDatabaseConnection } = require('../controllers/healthCheckController');

router.get('/', checkHealth);
router.get('/maintenance', checkMaintenanceMode);
router.post('/maintenance/enable', enableMaintenanceMode);
router.post('/maintenance/disable', disableMaintenanceMode);
router.get('/uptime', checkUptime);
router.get('/database', checkDatabaseConnection);

module.exports = router;
