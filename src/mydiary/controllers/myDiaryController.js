const diaryEntries = require('../models/diaryModel');

// Get all entries
// curl http://localhost:3002/diary
function getAllDiaries(req, res) {
  diaryEntries.findAll()
    .then((entries) => {
      res.status(200).json(entries);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message
      });
    });
}

// Create a new entry
// curl http://localhost:3002/diary -X POST -H "Content-Type: application/json" -d '{"title":"Hello, World!", "content":"Hello, World!", "weather":"sunny"}' 
function createDiary(req, res) {
  const title = req.body.title;
  const content = req.body.content;
  const weather = req.body.weather;

  diaryEntries.create({ title, content, weather })
    .then((entry) => {
      res.status(201).json(entry);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message
      });
    });
}

// Get specific entry
// curl http://localhost:3002/diary/1
function getDiary(req, res) {
  const id = req.params.id;

  diaryEntries.findByPk(id)
    .then((entry) => {
      res.status(200).json(entry);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message
      });
    });
}

// Update a diary entry
// curl http://localhost:3002/diary/1 -X PUT -H "Content-Type: application/json" -d '{"title":"Hello, World!", "content":"Hello, World!", "weather":"sunny"}'
function updateDiary(req, res) {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  const weather = req.body.weather;

  diaryEntries.update({ title, content, weather }, { where: { id } })
    .then(() => {
      res.status(200).send('Diary entry updated successfully');
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message
      });
    });
}

// Delete a diary entry
// curl http://localhost:3002/diary/1 -X DELETE
function deleteDiary(req, res) {
  const id = req.params.id;

  diaryEntries.destroy({ where: { id } })
    .then(() => {
      res.status(200).send('Diary entry deleted successfully');
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message
      });
    });
}

module.exports = { getAllDiaries, getDiary, createDiary, updateDiary, deleteDiary };
