const express = require('express');
const router = express.Router();
const { Pool } = require('pg');


const db = new Pool({
  connectionString: process.env.POSTGRES_URL ,
})


router.get('/json', async (req, res) => {
  const courseId = req.query.courseId;
  if (!courseId) {
    return res.status(400).json({ error: 'Missing courseId in the query parameters.' });
  }
  const { rows } = await db.query('SELECT  quiz_id,question, option1, option2, option3, option4,correct_option FROM Quizzes WHERE course_id = $1', [courseId]);
  if (rows.length === 0) {
    return res.status(404).json({ error: 'Course not found.' });
  }
 const json = {
  title: 'Quiz Test',
  showProgressBar: 'bottom',
  showTimerPanel: 'top',
  maxTimeToFinishPage: 60,
  maxTimeToFinish: rows.length * 60, // Assuming each question has a time limit of 60 seconds
  firstPageIsStarted: true,
  startSurveyText: 'Start Quiz',
  pages: [
    {
      elements: [
        {
          type: 'html',
          html: `You are about to start a quiz on WCEI. <br>You will have 1 minute for every question and ${rows.length} minutes to end the quiz.`,
        },
      ],
    },
    ...rows.map((question, i) => {
      return {
        elements: [
          {
            type: 'radiogroup',
            name: `question${i + 1}`,
            title: question.question,
            choices: [
              { value: 'option1', text: question.option1 },
              { value: 'option2', text: question.option2 },
              { value: 'option3', text: question.option3 },
              { value: 'option4', text: question.option4 },
            ],
            correctAnswer: question.correct_option,
            enableIf: 'empty',
            quiz_id: question.quiz_id,
          },
        ],
        
      };
    }),
  ],
};

    return res.json(json);
 
});

module.exports = router;
