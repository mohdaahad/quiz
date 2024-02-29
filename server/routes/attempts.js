  const express = require('express');
  const router = express.Router();
  const db = require('../database_layer/databaseSetup'); // Update the path accordingly
// ... (existing code)

// Get attempts data
router.get('/attempts', (req, res) => {
  const sql = "SELECT * FROM Attempts";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      let rows = data.rows;
      // Adjust tableHtml creation as needed for Attempts data
      let tableHtml = "<table id='attemptsTable'><thead><tr><th>Attempt ID</th><th>User ID</th><th>Total Score</th></tr></thead><tbody>";
      rows.forEach((row) => {
        tableHtml += `<tr><td>${row.attempt_id}</td><td>${row.user_id}</td><td>${row.total_score}</td></tr>`;
      });
      tableHtml += "</tbody></table>";

      // Adjust HTML as needed for Attempts data
      let html = `<!DOCTYPE html><html><head><title>Attempts</title><style>#attemptsTable {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      #attemptsTable td, #attemptsTable th {
        border: 1px solid #ddd;
        padding: 8px;
      }
      
      #attemptsTable tr:nth-child(even){background-color: #f2f2f2;}
      
      #attemptsTable tr:hover {background-color: #ddd;}
      
      #attemptsTable th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04AA6D;
        color: white;
      }</style></head><body>${tableHtml}</body></html>`;
      res.status(200).send(html);
    }
  });
});

// Add attempts data
// Add attempts data
router.post('/attempts', (req, res) => {
  const { user_id, total_score, course_id } = req.body;

  const insertQuery = "INSERT INTO Attempts (user_id, total_score, course_id, retake_count) VALUES ($1, $2, $3, COALESCE((SELECT MAX(retake_count) FROM Attempts WHERE user_id = $1) + 1, 1)) RETURNING attempt_id";

  db.query(insertQuery, [user_id, total_score, course_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Check if rows were affected
      if (result.rowCount === 1) {
        // Extract the attempt ID from the result
        const attemptId = result.rows[0].attempt_id;

        // Send the attempt ID in the response
        return res.status(200).json({ attemptId });
      } else {
        return res.status(500).json({ error: 'Failed to insert attempt' });
      }
    }
  });
});

// ... (existing code)
router.get('/attempts/:userId/:courseId', (req, res) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;
  const query = `
    SELECT Attempts.*, Courses.course_name
    FROM Attempts
    INNER JOIN Courses ON Attempts.course_id = Courses.course_id
    WHERE Attempts.user_id = $1 AND Attempts.course_id = $2
    ORDER BY Attempts.attempt_date DESC;
  `;
  db.query(query, [userId, courseId], (err, result) => {
    if (err) {
      console.error('Error fetching user attempts for course:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// In your server file (e.g., attempts.js)
// ... (existing code)

// Get user attempts for a specific course
router.get('/attempts/user/:userId/:courseId', async (req, res) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;

  // Query to get attempts
  const attemptsQuery = `
    SELECT Attempts.*, Courses.course_name
    FROM Attempts
    INNER JOIN Courses ON Attempts.course_id = Courses.course_id
    WHERE Attempts.user_id = $1 AND Attempts.course_id = $2
    ORDER BY Attempts.attempt_date DESC;
  `;

  // Query to get the number of questions
  const questionsCountQuery = `
    SELECT COUNT(*) AS total_questions
    FROM Quizzes
    WHERE course_id = $1;
  `;

  try {
    // Execute both queries concurrently
    const [attemptsResult, questionsResult] = await Promise.all([
      db.query(attemptsQuery, [userId, courseId]),
      db.query(questionsCountQuery, [courseId]),
    ]);

    const attemptsData = attemptsResult.rows;
    const totalQuestions = questionsResult.rows[0].total_questions;

    // Return the attempts data along with the total number of questions
    res.status(200).json({ attempts: attemptsData, totalQuestions });
  } catch (error) {
    console.error('Error fetching user attempts for course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/attempts/:attemptId', (req, res) => {
  const attemptId = req.params.attemptId;
  const selectQuery = `
    SELECT Attempts.*, Users.email, COUNT(Quizzes.quiz_id) AS quiz_count
    FROM Attempts
    INNER JOIN Users ON Attempts.user_id = Users.user_id
    LEFT JOIN Quizzes ON Attempts.course_id = Quizzes.course_id
    WHERE Attempts.attempt_id = $1
    GROUP BY Attempts.attempt_id, Users.email
  `;
  db.query(selectQuery, [attemptId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const resultData = result.rows[0];
    return res.status(200).json({ result: resultData });
  });
});

module.exports = router;


