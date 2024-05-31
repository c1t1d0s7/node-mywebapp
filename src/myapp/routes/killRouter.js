const express = require('express');
const router = express.Router();
const killServer = require('../controllers/killController');

router.get('/', killServer);

module.exports = router;
