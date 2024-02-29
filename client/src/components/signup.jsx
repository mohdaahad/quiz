import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Paper, CssBaseline, FormHelperText, Grid, TextField, Typography, FormControl, ThemeProvider, Select, MenuItem, InputLabel, InputAdornment, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import image from '../images/login.jpg'; 
import Axios from 'axios';

const theme = createTheme();

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fathername, setFathername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [classSelection, setClassSelection] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [fullnameError, setFullnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [fathernameError, setFathernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [classSelectionError, setClassSelectionError] = useState(false);
  const [classes, setClasses] = useState([]);
  const [registerStatus, setRegisterStatus] = useState("");

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First request to get IP
      

        // Second request using the obtained IP
        const responseValidation = await Axios.get(`https://quiz-4.onrender.com/valid`);

        if (responseValidation.data.valid) {
          // If the data is valid, navigate to the home page
          navigate('/');
        }
        const classesResponse = await Axios.get(`https://quiz-4.onrender.com/classes`);
        setClasses(classesResponse.data.classes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
  };

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
    setFullnameError(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleFathernameChange = (event) => {
    setFathername(event.target.value);
    setFathernameError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setAddressError(false);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
    setDobError(false);
  };

  const handleClassSelectionChange = (event) => {
    setClassSelection(event.target.value);
    setClassSelectionError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      validateFullname(fullname) &&
      validateUsername(username) &&
      validateFathername(fathername) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateAddress(address) &&
      validateDob(dob) &&
      validateClassSelection(classSelection)
    ) {
      Axios.post(`https://quiz-4.onrender.com/sign-up`, {
        email: email,
        username: username,
        password: password,
        fathername: fathername,
        class: classSelection,
        fullname: fullname,
        address: address,
        dob: dob,
      }).then((response) => {
        if (response.data.message) {
          setRegisterStatus(response.data.message);
        } else {
          setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
          navigate('/');
        }
      });
    } else {
      if (!validateFullname(fullname)) {
        setFullnameError(true);
      }
      if (!validateUsername(username)) {
        setUsernameError(true);
      }
      if (!validateFathername(fathername)) {
        setFathernameError(true);
      }
      if (!validateEmail(email)) {
        setEmailError(true);
      }
      if (!validatePassword(password)) {
        setPasswordError(true);
      }
      if (!validateAddress(address)) {
        setAddressError(true);
      }
      if (!validateDob(dob)) {
        setDobError(true);
      }
      if (!validateClassSelection(classSelection)) {
        setClassSelectionError(true);
      }
    }
  };

  const validateUsername = (username) => {
    const regex = /^\S+$/;
    return regex.test(username) && username.length >= 5;
  };

  const validateFathername = (fathername) => {
    return fathername.length >= 3;
  };

  const validateFullname = (fullName) => {
    return fullName.length >= 3;
  };

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateAddress = (address) => {
    return address.length > 0;
  };

  const validateDob = (dob) => {
    // Assuming a simple date format validation
    return dob.length > 0;
  };

  const validateClassSelection = (classSelection) => {
    return classes.some((classItem) => classItem.class_id === classSelection);
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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    autoComplete="given-name"
                    name="fullName"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    autoFocus
                    value={fullname}
                    onChange={handleFullnameChange}
                    error={fullnameError}
                    helperText={fullnameError && 'Please enter a valid fullName'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoComplete="given-name"
                    name="userName"
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    error={usernameError}
                    helperText={usernameError && 'Please enter a valid username'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoComplete="father-name"
                    name="fatherName"
                    required
                    fullWidth
                    id="fatherName"
                    label="Father Name"
                    value={fathername}
                    onChange={handleFathernameChange}
                    error={fathernameError}
                    helperText={fathernameError && 'Please enter a valid father name'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth required error={classSelectionError}>
                    <InputLabel id="demo-simple-select-helper-label">Select a Class</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={classSelection}
                      onChange={handleClassSelectionChange}
                      label="Select a Class"
                    >
                        {classes.map((classItem) => (
                <MenuItem key={classItem.class_id} value={classItem.class_id}>
                  {classItem.class_name}
                </MenuItem>
              ))}
                    </Select>
                    <FormHelperText>{classSelectionError && 'Please select a class'}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                    helperText={emailError && 'Please enter a valid email address'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="dob"
                    label="Date of Birth"
                    type="date"
                    id="dob"
                    autoComplete="bday"
                    value={dob}
                    onChange={handleDobChange}
                    error={dobError}
                    helperText={dobError && 'Please enter a valid date of birth'}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    id="address"
                    autoComplete="address"
                    value={address}
                    onChange={handleAddressChange}
                    error={addressError}
                    helperText={addressError && 'Please enter a valid address'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handlePasswordChange}
                    error={passwordError}
                    helperText={
                      passwordError &&
                      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit and without spaces."
                    }
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  {registerStatus}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  Already have an account?
                  <Link to="/sign-in" style={{ textDecoration: 'none' }} variant="body2">
                    Sign in
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
