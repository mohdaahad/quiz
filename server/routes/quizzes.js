const express = require('express');
const router = express.Router();
const db = require('../database_layer/databaseSetup');


router.post('/quizzes', async (req, res) => {
  try {
    const { course_id, question, option1, option2, option3, option4, correct_option } = req.body;

    const insertQuizQuery = `
      INSERT INTO Quizzes (course_id, question, option1, option2, option3, option4, correct_option)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [course_id, question, option1, option2, option3, option4, correct_option];

    const result = await db.query(insertQuizQuery, values);

    const savedQuiz = result.rows[0];
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error('Error saving quiz:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  // Other quiz-related routes can be added here
  
  module.exports = router;