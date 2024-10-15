import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/customer_header'; 
import Footer from '../Components/customer_footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
  };

  const validateFields = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = "Email is required";
    else if (!emailPattern.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        console.log(response.data.user)
        if(response.data.role==="USER"){
          localStorage.setItem("user", JSON.stringify(response.data.user))
          navigate("/user")
        }else{
          navigate("/admin/view-supplier")
        }

      } else {  
        swal("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      swal("Error", "Login failed. Please try again.", "error");
    }
  };

  return (
    <>
      <Header /> 
      
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{
          height: '100vh',
          backgroundImage: 'url("https://delhi6sweets.com.au/wp-content/uploads/2023/05/1662465216_groupindianassortedsweetsmithaiwithdiya.jpg")', // Add the path to your background image here
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            padding: '40px',
            width: '100%',
            maxWidth: '400px', 
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontWeight: 'bold', color: 'green', textAlign: 'center' }}
          >
            Login
          </Typography>

          <Box component="form" width="100%" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              style={{ marginTop: 16 , backgroundColor:'#CC5500'}}
            >
              Login
            </Button>
          </Box>

          <Typography variant="body2" style={{ marginTop: 16 }}>
            Don’t have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
      <Footer></Footer>
    </>
  );
};

export default Login;
