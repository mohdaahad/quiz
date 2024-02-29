const express = require('express');
const router = express.Router();
const db = require('../database_layer/databaseSetup'); // Update the path accordingly

router.get('/classes', (req, res) => {
  const getClassesQuery = 'SELECT * FROM Classes';

  db.query(getClassesQuery, (error, result) => {
    if (error) {
      console.error('Error fetching classes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const classes = result.rows;
      res.json({ classes });
    }
  });
});

module.exports = router;
