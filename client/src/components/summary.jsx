import {React,useEffect,useState} from 'react';
import { Container, Typography, Button, Box, Grid, Paper, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import image from '../images/user.png';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
function CircularProgressWithLabel(props) {
  
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' ,width: '350px', height: '350px'}}>
      <CircularProgress size={350} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" component="div" sx={{fontWeight: "bold"}}  color="primary">
          {`${Math.round(props.value)}%`}
          <Typography variant="h6" component="div"  color="text.secondary"  style={{ textAlign: 'center' }}>
          Overall Score
        </Typography>
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

function SummaryComponent() {
  const [progress, setProgress] = useState(0);
  const [scorepercentage, scorePercentage] = useState();
  const { attemptId } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    
    navigate(`/review/${attemptId}`);
  };
  const handlehomeButtonClick = () => {
    
    navigate(`/`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.get(`https://quiz-4.onrender.com/attempts/${attemptId}`, { withCredentials: true });
        setData(response.data.result);
        const scorepercentage = (response.data.result.total_score * 100 )/(response.data.result.quiz_count) ;
        scorePercentage(scorepercentage)
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= scorepercentage ? scorepercentage : prevProgress + 1));
          if (progress >= scorepercentage) {
            clearInterval(timer);
          }
        }, 10);

        return () => {
          clearInterval(timer);
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 

  
    fetchData();
  }, [attemptId, data, progress]);


  return (
    <Container>
      <Paper  elevation={3} sx={{ p: 2, my: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" color="#555" mb={2} style={{ fontWeight: 'bold'}}>
              Summary
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="#555" mb={1}>
              Assessment ID <span style={{ color: '#1976D2',fontWeight: 'bold' }}>{attemptId}</span>
            </Typography>
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={2}>
          <Grid item xs={5}>
         
          <Paper
    elevation={3} // Set the desired elevation value
    className="bounce-animation"
    style={{
      height: '350px',
      width: '350px',
      backgroundColor: '#fff',
      display: 'inline-block',
      margin: '50px',
      padding: '20px',
      borderRadius: '50%',
    }}
  >
    <CircularProgressWithLabel value={progress} />
  </Paper>
          
          </Grid>
          <Grid item xs={7}>
          <div className="card">
      <div className="card-id"></div>
      <div className="card-body">
        <div className="card-avatar">
          <img src={image} alt="" />
        </div>
        <div className="card-info">
          <div className="card-name"></div>
          <div className="card-email">{data?.email || 'Loading...'}</div>
        </div>
      </div>
    </div>
          </Grid>
        </Grid>
        {/* ... Other summary content ... */}
        <hr />
            <Box mt={2}>
      <Typography variant="h5" color="#999">
        Instructions
      </Typography>
      
      {scorepercentage >= 60 ? (
  <Typography sx={{ my: 1 }}>You passed this test!</Typography>
) : (
  <Typography sx={{ my: 1 }}>You failed this test!</Typography>
)}

    </Box>

        <hr />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleButtonClick} style={{ borderRadius: '20px', backgroundColor: '#1565c0', color: '#fff' }}>
            Review Questions, Answers &amp; Explanations
          </Button>
          <Button variant="contained" color="primary"  onClick={ handlehomeButtonClick}  style={{ borderRadius: '20px', backgroundColor: '#1976d2', color: '#fff' }}>
            I'm done.
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default SummaryComponent;
