const express = require('express');
const router = express.Router();

const {
  getPodDetailsEnv,
  getPodDetailsDApi
} = require('../controllers/podDetailsController');

router.get('/', getPodDetailsEnv);
router.get('/env', getPodDetailsEnv);
router.get('/dapi', getPodDetailsDApi);

module.exports = router;
