const express = require('express');
const router = express.Router();
const db = require('../database_layer/databaseSetup');
router.get('/courses', (req, res) => {
    const getCoursesQuery = 'SELECT * FROM Courses';
  
    db.query(getCoursesQuery, (error, result) => {
      if (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const courses = result.rows;
        res.json({ courses });
      }
    });
  });


  router.post('/courses', async (req, res) => {
    const { courseName } = req.body;
  
    try {
      const insertCourseQuery = 'INSERT INTO Courses (course_name) VALUES ($1) RETURNING *';
      const result = await db.query(insertCourseQuery, [courseName]);
      const newCourse = result.rows[0];
      res.status(201).json({ course: newCourse });
    } catch (error) {
      console.error('Error saving course:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;