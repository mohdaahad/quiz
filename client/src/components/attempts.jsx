import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import { red } from '@mui/material/colors';

function Attempts() {
  const { userId, courseId } = useParams();
  const [attemptsData, setAttemptsData] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const getAttemptCategory = (score, totalQuestions) => {
    const percentage = (score / totalQuestions) * 100;
  
    if (percentage >= 80) {
      return <span style={{ color: '#33FF33' }}>Best Attempt</span>;
    } else if (percentage >= 60) {
      return <span style={{ color: '#FFFF33' }}>Good Attempt</span>;
    } else {
      return <span style={{ color: '#FF3333' }}>Needs Improvement</span>;
    }
  };
  
  function getBackgroundColor(score, totalQuestions) {
    const percentage = (score / totalQuestions) * 100;
  
    if (percentage >= 80) {
      return '#E5FFCC';
    } else if (percentage >= 60) {
      return '#FFFFCC';
    } else {
      return '#FFCCCC';
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.get(`https://quiz-4.onrender.com/attempts/user/${userId}/${courseId}`);
        const { attempts, totalQuestions } = response.data;
        
        // Set the state with the fetched data
        setAttemptsData(attempts);
        setTotalQuestions(totalQuestions);
      } catch (error) {
        console.error('Error fetching attempts data:', error);
        setError('Failed to fetch attempts data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, courseId]);

  const firstAttempt = attemptsData.length > 0 ? attemptsData[0] : null;

  const handleRetakeAssessment = () => {
    // Add logic if needed before navigation
    navigate(`/quiz/${courseId}`);
  };

  return (
    <Card
      sx={{
        flexDirection: 'column',
        overflowY: 'auto',
        backgroundColor: 'white',
        width: '100%',
        height: '100vh',
        // maxHeight: 'calc(100vh - 8rem)',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {firstAttempt && firstAttempt.course_name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={firstAttempt ? `Quiz ${firstAttempt.course_name}` : 'No Attempts'}
        subheader={firstAttempt ? firstAttempt.course_name : 'No Attempts'}
      />
      <hr />

      {loading && <LinearProgress />} {/* Loading Indicator */}

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error Message */}

      {attemptsData.map((attempt) => (
        <div key={attempt.attempt_id}>
          <CardContent>
          <p> 
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{`Attempt ${attempt.retake_count}`}</span>
            <span style={{ color: 'rgba(94,110,136)', margin: '20px' }}> {`Submitted On ${new Date(attempt.attempt_date).toLocaleString()}`}</span>
            <span style={{  }}>
            {`Score: ${attempt.total_score}/${totalQuestions}`}
            </span>
            <span style={{ backgroundColor: getBackgroundColor(attempt.total_score,totalQuestions), padding: '5px',margin: '20px', borderRadius: '5px' }}>
            {getAttemptCategory(attempt.total_score,totalQuestions)}
            </span>
          </p>
          
         
         

          </CardContent>
          <hr />
        </div>
      ))}

      {attemptsData.length === 0 && <p>No attempts available.</p>} {/* No Attempts Message */}

      <div
  role="button"
  tabIndex={0}
  onClick={handleRetakeAssessment}
  style={{ cursor: 'pointer', textDecoration: 'underline' }}
>
  Retake assessment
</div>
    </Card>
  );
}

export default Attempts;
