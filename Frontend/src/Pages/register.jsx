import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert';
import Header from '../Components/customer_header';
import Footer from '../Components/customer_footer';
import Sidebar from '../Components/sidebar'; 
import { Link, useNavigate } from 'react-router-dom';
import RegisterImg from '../Images/sweet3.png';

const Register = () => {
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [staffId, setStaffId] = useState(''); 
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState(''); 
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    generateStaffId(); // Generate staff ID when the component mounts
  }, []);

  // Function to generate random staff ID
  const generateStaffId = () => {
    const randomId = 'STF' + Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit ID with 'STF' prefix
    setStaffId(randomId);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, position: '' }));
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, department: '' }));
  };

  const handleContactChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setContact(value);
      setErrors((prevErrors) => ({ ...prevErrors, contact: '' }));
    }
  };

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

  // Function to calculate age based on DOB
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handle DOB change and set the age automatically
  const handleDobChange = (event) => {
    const dobValue = event.target.value;
    setDob(dobValue);
    const calculatedAge = calculateAge(dobValue);
    setAge(calculatedAge);
    setErrors((prevErrors) => ({ ...prevErrors, dob: '' }));
  };

  const validateFields = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!staffId) newErrors.staffId = "Staff ID is required";
    if (!name) newErrors.name = "Name is required";
    if (!dob) {
      newErrors.dob = "Date of Birth is required";
    } else if (calculateAge(dob) < 18) {
      newErrors.dob = "User must be at least 18 years old";
    }
    if (!address) newErrors.address = "Address is required";
    if (!position) newErrors.position = "Position is required";
    if (!department) newErrors.department = "Department is required";
    if (!contact) newErrors.contact = "Contact number is required";
    else if (contact.length !== 10) newErrors.contact = "Contact number must be exactly 10 digits"; // Validation for 10 digits
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (!emailPattern.test(email)) newErrors.email = "Invalid email format";

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUser = {
      staffId,
      name,
      dob,
      age, // Include the age in the form data
      address,
      position,
      department,
      contact,
      email,
      password
    };

    try {
      await axios.post('http://localhost:3001/staff/add-staff', newUser);
      swal("Success", "Registration successful!", "success")
    } catch (error) {
      console.error(error);
      swal("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div style={{ backgroundColor: '#2E4857' }}>
      <Header />
      <Box display="flex" flexDirection="row" style={{ backgroundColor: 'white' }}>
        <Sidebar /> {/* Add the Sidebar component */}

        <Box
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="space-between"
          style={{
            width: '80%',
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
              height: 'auto',
              padding: '5px',
              width: '100%',
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                padding: '40px',
                width: '100%',
                maxWidth: '950px', // Adjust max width for a more compact form
                marginTop: '20px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'row', // Change to row for side-by-side layout
              }}
            >
              {/* Form Section */}
              <Box flex={1} display="flex" flexDirection="column">
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ color: 'green', fontWeight: '600'}}
                >
                  Staff Register
                </Typography>

                <Box component="form" width="100%" noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Staff Member ID"
                    variant="outlined"
                    value={staffId}
                    disabled // Disabled as it's automatically generated
                    error={!!errors.staffId}
                    helperText={errors.staffId}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
                    }}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="DOB"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={dob}
                    onChange={handleDobChange}
                    error={!!errors.dob}
                    helperText={errors.dob}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Age"
                    variant="outlined"
                    value={age}
                    disabled
                    error={!!errors.age}
                    helperText={errors.age}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, address: '' }));
                    }}
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Contact"
                    variant="outlined"
                    value={contact}
                    onChange={handleContactChange}
                    error={!!errors.contact}
                    helperText={errors.contact}
                  />
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Position</InputLabel>
                    <Select
                      value={position}
                      onChange={handlePositionChange}
                      label="Position"
                      error={!!errors.position}
                    >
                      <MenuItem value="Store Manager">Store Manager</MenuItem>
                      <MenuItem value="Customer Service Representative">Customer Service Representative</MenuItem>
                      <MenuItem value="E-commerce Specialist">E-commerce Specialist</MenuItem>
                      <MenuItem value="Baker/Confectioner">Baker/Confectioner</MenuItem>
                      <MenuItem value="Marketing Coordinator">Marketing Coordinator</MenuItem>
                      <MenuItem value="Order Fulfillment Specialist">Order Fulfillment Specialist</MenuItem>
                    </Select>
                    {errors.position && <Typography color="error">{errors.position}</Typography>}
                  </FormControl>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={department}
                      onChange={handleDepartmentChange}
                      label="Department"
                      error={!!errors.department}
                    >
                        <MenuItem value="Management">Management</MenuItem>
                        <MenuItem value="Customer Service">Customer Service</MenuItem>
                        <MenuItem value="Production">Production</MenuItem>
                        <MenuItem value="Marketing">Marketing</MenuItem>
                    </Select>
                    {errors.department && <Typography color="error">{errors.department}</Typography>}
                  </FormControl>
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
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                  >
                    Register
                  </Button>
                </Box>
              </Box>

              {/* Image Section */}
              <Box
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{
                  padding: '10px',
                  height: '100%', 
                  marginLeft:'20px'
                }}
              >
                <img src={RegisterImg} alt="Registration" style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Register;
