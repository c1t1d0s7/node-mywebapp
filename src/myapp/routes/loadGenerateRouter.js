const express = require('express');
const router = express.Router();
const {
  generateCPULoad,
  generateMemoryLoad
} = require('../controllers/loadGenerateController');

router.get('/cpu', generateCPULoad);
router.get('/memory', generateMemoryLoad);

module.exports = router;
