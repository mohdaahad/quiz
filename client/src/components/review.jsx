import React, { useEffect, useState } from 'react';
import { Container, Paper, Button, Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReviewComponent() {
  const { attemptId } = useParams();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const questionsPerPage = 10;
  const navigate = useNavigate();
  const handleButtonClick = () => {
    
    navigate(`/summary/${attemptId}`);
  };
  const handlehomeButtonClick = () => {
    
    navigate(`/`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.get(`https://quiz-4.onrender.com/results/${attemptId}`, { withCredentials: true });
        setData(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [attemptId]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastQuestion = page * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = data?.slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, my: 1 }}>
        <div className="legend">
          <div className="legend-correct">Correct Answer</div>
          <div className="legend-partial">Partially Correct</div>
          <div className="legend-incorrect">Incorrect Answer</div>
        </div>
        <hr />

        {currentQuestions &&
          currentQuestions.map((item, i) => {
            const questionNumber = indexOfFirstQuestion + i + 1; // Adjusting question number

            // Assuming item contains information for each question and answer
            const { question, selected_option, is_correct } = item;

            // Generating HTML elements for each question and answer
            return (
              <div key={i} className="review-wrapper">
                <div className="question">
                  <div className="question-number">{questionNumber}</div>
                  <div className="question-text">{question}</div>
                </div>

                <div className="review review-test review-tmc">
                  {selected_option === is_correct ? (
                    <div className="review-correct">
                      <div className="review-label">Your Answer</div>
                      <div className="review-text">{selected_option}</div>
                    </div>
                  ) : selected_option === 'Not found' ? (
                    <div className="review-partial">
                      <div className="review-label">Your Answer</div>
                      <div className="review-text">{selected_option}</div>
                    </div>
                  ) : (
                    <div className="review-incorrect">
                      <div className="review-label">Your Answer</div>
                      <div className="review-text">{selected_option}</div>
                    </div>
                  )}

                  <div className="review-answer">
                    <div className="review-label">Correct Answer</div>
                    <div className="review-text">{is_correct}</div>
                  </div>
                </div>
              </div>
            );
          })}

        <hr />
        <Stack spacing={2} mt={2} direction="row" justifyContent="center">
          <Pagination
            count={Math.ceil((data?.length || 0) / questionsPerPage)}
            variant="outlined"
            color="primary"
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleButtonClick} style={{ borderRadius: '20px', backgroundColor: '#1565c0', color: '#fff' }}>
            Summary
          </Button>
          <Button variant="contained" color="primary" onClick={ handlehomeButtonClick} style={{ borderRadius: '20px', backgroundColor: '#1976d2', color: '#fff' }}>
            I'm done.
          </Button>
        </Box>
      
        {/* Pagination component */}
       
      </Paper>
    </Container>
  );
}

export default ReviewComponent;
