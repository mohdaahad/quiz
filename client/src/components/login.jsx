import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  ThemeProvider,
  Alert,Paper
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import image from '../images/login.jpg';  
const theme = createTheme();

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  Axios.defaults.withCredentials = true;
    const fetchData = async () => {
      try {
        // First request to get IP
    
  
        // Second request using the obtained IP
        const responseValidation = await Axios.get(`https://quiz-4.onrender.com/valid`);
        if (responseValidation.data.valid) {
          // If the data is valid, navigate to the home page
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();  
  }, [navigate]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username.trim()) {
      setUsernameError('Username is required');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }

    Axios.post(`https://quiz-4.onrender.com/sign-in`, { username, password })
    .then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        navigate('/');
      }
    })
    .catch((error) => {  
      if (error.response) {
        setLoginStatus(error.response.data.message);
      }
    });
  
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError('');
              }}
              error={!!usernameError}
              helperText={usernameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              
              id="password"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ?  <Visibility />:<VisibilityOff /> }
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              error={!!passwordError}
                helperText={passwordError}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"

            /> */}
             {/* <Grid container>
              <Grid item xs>
                <Link href="#" style={{textDecoration: 'none'}} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
             
            </Grid> */}
            <Grid container>
  <Grid item xs>
    {loginStatus && (
      <Alert severity="error">
        {loginStatus}
      </Alert>
    )}
  </Grid>
</Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
            <Grid item xs >
            </Grid>
              <Grid item >
              Don't have an account?<Link to="/sign-up" style={{textDecoration: 'none'}} variant="body2">    {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}