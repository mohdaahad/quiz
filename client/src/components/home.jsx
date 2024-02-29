import { useEffect, useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Box,Container,CssBaseline,Typography,Stack,AppBar,Toolbar,useScrollTrigger,Slide,Paper,Menu ,Avatar,Badge ,Tooltip,MenuItem,IconButton  } from '@mui/material';
import { styled } from '@mui/material/styles'; 
import image from '../images/logo.png';
import { blue } from '@mui/material/colors';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: 'black', // Set text color to black
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center content horizontally
  justifyContent: 'center', // Center content vertically
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#253040' : '#f5f5f5', // Change background color on hover
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
function Home(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [quiz, setquiz] = useState('');
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState('');
  axios.defaults.withCredentials = true;
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }
  const getInitials = (name) => {
    const words = name.split(' ');
    const initials = words.map(word => word[0]);
    return initials.join('').toUpperCase();
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCourses = await axios.get(`https://quiz-4.onrender.com/courses`, { withCredentials: true });
        setCourses(responseCourses.data.courses);
        const responseQuiz = await axios.get(`https://quiz-4.onrender.com/valid`, { withCredentials: true });
        console.log(responseQuiz.data.valid)
        if (responseQuiz.data.valid) {
          setName(responseQuiz.data.fullname);
          setquiz(responseQuiz.data.quiz);
          setUserId(responseQuiz.data.id);
        } else {
          navigate('/sign-in');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [navigate]);
 
  const handleLogout = () => {
    axios.post(`https://quiz-4.onrender.com/logout`)
      .then(res => navigate('/sign-in'))
      .catch(err => console.log(err));
  };
  const handleQuestion = () => {
    navigate('/quizz')
  };
  const handleCourse = () => {
    navigate('/courses')
  };
  const handleQuiz = async (courseId) => {
    try {
      // Check if the user has attempted the quiz for the selected course
      const responseAttempts = await axios.get(`https://quiz-4.onrender.com/attempts/${userId}/${courseId}`, { withCredentials: true });
      const attempts = responseAttempts.data;
  
      if (attempts.length > 0) {
        // User has attempted the quiz, navigate to attempts page
        navigate(`/attempts/${userId}/${courseId}`);
      } else {
        // User has not attempted the quiz, navigate to quiz page
        navigate(`/quiz/${courseId}`);
      }
    } catch (error) {
      console.error('Error checking attempts:', error);
    }
  };
  

  const startButton = !quiz && (
    <Stack spacing={2}>
      {courses.map((course) => (
        <Item key={course.course_id} sx={{ p: 4 }} onClick={() => handleQuiz(course.course_id)}>
          <LocalLibraryIcon fontSize="small" /> {course.course_name}
        </Item>
      ))}
    </Stack>
  );
  // const startButton = !quiz && <Button variant="contained" onClick={handleQuiz}>Start Quiz</Button>;
  return (
    <div style={{backgroundColor: '#F1F1F1'}}>  <React.Fragment>
    <CssBaseline />
    <HideOnScroll {...props}>
      <AppBar sx={{ backgroundColor: '#FFFFFF', color: '#2196f3' }}>
        <Toolbar>
           <Avatar alt="Remy Sharp" src={image} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WCEI
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WCEI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <StyledBadge sx={{ border: `2px solid ${blue[500]}`, borderRadius: '50%', padding: '2px' }}
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
     <Avatar sx={{ bgcolor: blue[500] }}>{getInitials(name)}</Avatar>
    </StyledBadge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               <MenuItem >
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
                <MenuItem  onClick={handleCourse}>
                  <Typography textAlign="center">Add Course</Typography>
                </MenuItem>
                <MenuItem  onClick={handleQuestion}>
                  <Typography textAlign="center">Add Question</Typography>
                </MenuItem>
                <MenuItem  onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
   
    <Container sx={{ backgroundColor: '#F1F1F1',my: 8, p:4,borderRadius: "20px"}} >
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
      {startButton}
      </Stack>
    </Box>
    </Container>
  </React.Fragment></div>
  );
}

export default Home;
