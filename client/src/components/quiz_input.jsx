// QuizInput.jsx
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const QuizInput = () => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch courses from the backend

        const response = await axios.get(`https://quiz-4.onrender.com/courses`);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  const handleOption3Change = (event) => {
    setOption3(event.target.value);
  };

  const handleOption4Change = (event) => {
    setOption4(event.target.value);
  };

  const handleCorrectOptionChange = (event) => {
    setCorrectOption(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourseId(event.target.value);
  };

  const handleSaveQuiz = async () => {
    try {
      const response = await axios.post(`https://quiz-4.onrender.com/quizzes`, {
        course_id: courseId,
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        correct_option: correctOption,
      });

      // Handle the response or perform any necessary actions
      console.log('Quiz saved successfully:', response.data);
      setSuccessMessage('Quiz saved successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving quiz:', error);
      setErrorMessage('Error saving quiz');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <Select
        label="Select Course"
        value={courseId}
        onChange={handleCourseChange}
        fullWidth
      >
        {courses.map((course) => (
          <MenuItem key={course.course_id} value={course.course_id}>
            {course.course_name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Question"
        variant="outlined"
        value={question}
        onChange={handleQuestionChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Option 1"
        variant="outlined"
        value={option1}
        onChange={handleOption1Change}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Option 2"
        variant="outlined"
        value={option2}
        onChange={handleOption2Change}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Option 3"
        variant="outlined"
        value={option3}
        onChange={handleOption3Change}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Option 4"
        variant="outlined"
        value={option4}
        onChange={handleOption4Change}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Correct Option"
        variant="outlined"
        value={correctOption}
        onChange={handleCorrectOptionChange}
        fullWidth
        margin="normal"
      />
       <Stack spacing={2}>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Stack>
      <Button variant="contained" color="primary" onClick={handleSaveQuiz}>
        Save Quiz
      </Button>
     
    </div>
  );
};

export default QuizInput;
