import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const CourseInput = () => {
  const [courseName, setCourseName] = useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleSaveCourse = async () => {
    try {
    
      
      const response = await axios.post(`https://quiz-4.onrender.com/courses`, {
        courseName: courseName,
      });

      // Update success message
      setSuccessMessage('Course saved successfully');
      setErrorMessage(''); // Clear any previous error messages

      // You can reset the courseName if needed
      setCourseName('');

    } catch (error) {
      // Update error message
      setErrorMessage('Error saving course');
      setSuccessMessage(''); // Clear any previous success messages
      console.error('Error saving course:', error);
    }
  };

  return (
    <div>
      <TextField 
        label="Course Name"
        variant="outlined"
        value={courseName}
        onChange={handleCourseNameChange}
        fullWidth
        margin="normal"
      />
       <Stack spacing={2} mt={2}>
        {successMessage && (
          <Alert severity="success">{successMessage}</Alert>
        )}
        {errorMessage && (
          <Alert severity="error">{errorMessage}</Alert>
        )}
      </Stack>
      <Button variant="contained" color="primary" onClick={handleSaveCourse}>
        Save Course
      </Button>

     
    </div>
  );
};

export default CourseInput;
