const express = require('express');
const router = express.Router();

const { getAllDiaries, getDiary, createDiary, updateDiary, deleteDiary } = require('../controllers/myDiaryController');

router.get('/', getAllDiaries);
router.get('/:id', getDiary);
router.post('/', createDiary);
router.put('/:id', updateDiary);
router.delete('/:id', deleteDiary);

module.exports = router;
