const express = require('express');
const router = express.Router();
const db = require('../database_layer/databaseSetup');

router.post('/results', (req, res) => {
    const { attempt_id, quiz_id, selected_option, is_correct } = req.body;
  
    const insertQuery = `
      INSERT INTO Results (attempt_id, quiz_id, selected_option, is_correct)
      VALUES ($1, $2, $3, $4)
      RETURNING result_id
    `;
  
    db.query(insertQuery, [attempt_id, quiz_id, selected_option, is_correct], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      return res.status(200).send(result);
    });
  });

  router.get('/results', (req, res) => {
    const selectQuery = 'SELECT * FROM Results';
  
    db.query(selectQuery, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      const results = result.rows;
      return res.status(200).json({ results });
    });
  });

  router.get('/results/:attempt_id', (req, res) => {
    const attempt_id = req.params.attempt_id;
    const selectQuery = `
    SELECT Results.*, Quizzes.question
    FROM Results
    INNER JOIN Quizzes ON Results.quiz_id = Quizzes.quiz_id
    WHERE Results.attempt_id = $1;
  `;
  
    db.query(selectQuery, [attempt_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      const resultData = result.rows;
      return res.status(200).json({ result: resultData });
    });
  });
  
module.exports = router;