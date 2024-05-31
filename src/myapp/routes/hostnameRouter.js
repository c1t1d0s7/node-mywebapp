const express = require('express');
const router = express.Router();
const getHostname = require('../controllers/hostnameController');

router.get('/', getHostname);

module.exports = router;
