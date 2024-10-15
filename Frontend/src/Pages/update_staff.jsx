import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@material-ui/core';
import Sidebar from '../Components/sidebar';
import Header from '../Components/navbar';
import axios from 'axios';
import swal from 'sweetalert';
import MainHeader from '../Components/customer_header'; 
import Footer from '../Components/customer_footer';
import RegisterImg from '../Images/sweet3.png';

const UpdateStaff = () => {
  const { id } = useParams(); // Get the staff ID from the URL
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState({
    staffId: '',
    name: '',
    dob: '',
    address: '',
    position: '',
    department: '',
    contact: '',
    email: '' // Added email field
  });
  const [errors, setErrors] = useState({}); // State for error messages
  const [age, setAge] = useState(''); // State for calculated age

  // Fetch the staff data when the component mounts
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/staff/get-staff/${id}`);
        setStaffData(response.data);
        calculateAge(response.data.dob); // Calculate age after fetching data
      } catch (error) {
        console.error("There was an error fetching the staff data!", error);
      }
    };

    fetchStaffData();
  }, [id]);

  // Calculate age based on DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = new Date() - birthDate;
    const calculatedAge = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25)); // Approximate age in years
    setAge(calculatedAge); // Set the calculated age
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStaffData({
      ...staffData,
      [name]: value,
    });

    // Recalculate age whenever DOB is changed
    if (name === 'dob') {
      calculateAge(value);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();
    const dobYear = new Date(staffData.dob).getFullYear();
    
    // Validate Contact
    if (!/^\d{10}$/.test(staffData.contact)) {
      newErrors.contact = "Contact must be 10 digits and cannot contain letters.";
    }
    
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(staffData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    // Validate Date of Birth
    if (currentYear - dobYear < 18) {
      newErrors.dob = "You must be at least 18 years old.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) {
      return; // Do not submit if there are validation errors
    }
    try {
      await axios.put(`http://localhost:3001/staff/update-staff/${id}`, staffData);
      swal("Success", "Employee details updated successfully!", "success");
      navigate('/view-staff');
    } catch (error) {
      console.error(error);
      swal("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <Box>
      <MainHeader /> {/* Add the header here */}
      <Box display="flex">
        <Sidebar />
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          style={{ backgroundColor: 'white', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', flex: 1, margin: '15px' }}
        >
          {/* Title Section */}
          <Box alignItems="center" justifyContent="center">
            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: 'green', textAlign: 'center', marginTop:'40px' }}>
              Update Employee Details
            </Typography>
          </Box>

          <Box display="flex" width="100%">
            {/* Form Section */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              style={{ flex: 1, padding: '20px', margin: '15px' }}
            >
              <Box component="form" width="100%" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Staff Member ID"
                  variant="outlined"
                  name="staffId"
                  value={staffData.staffId}
                  onChange={handleChange}
                  disabled
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={staffData.name}
                  onChange={handleChange}
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
                  name="dob"
                  value={staffData.dob.substring(0, 10)}
                  onChange={handleChange}
                  error={!!errors.dob}
                  helperText={errors.dob}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Age"
                  variant="outlined"
                  value={age} 
                  InputProps={{ readOnly: true }} 
                  disabled
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Address"
                  variant="outlined"
                  name="address"
                  value={staffData.address}
                  onChange={handleChange}
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Position</InputLabel>
                  <Select
                    name="position"
                    value={staffData.position}
                    onChange={handleChange}
                    label="Position"
                  >
                    <MenuItem value="Store Manager">Store Manager</MenuItem>
                    <MenuItem value="Customer Service Representative">Customer Service Representative</MenuItem>
                    <MenuItem value="E-commerce Specialist">E-commerce Specialist</MenuItem>
                    <MenuItem value="Baker/Confectioner">Baker/Confectioner</MenuItem>
                    <MenuItem value="Marketing Coordinator">Marketing Coordinator</MenuItem>
                    <MenuItem value="Order Fulfillment Specialist">Order Fulfillment Specialist</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={staffData.department}
                    onChange={handleChange}
                    label="Department"
                  >
                    <MenuItem value="Management">Management</MenuItem>
                    <MenuItem value="Customer Service">Customer Service</MenuItem>
                    <MenuItem value="Production">Production</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Contact"
                  variant="outlined"
                  name="contact"
                  value={staffData.contact}
                  onChange={handleChange}
                  error={!!errors.contact} // Show error if exists
                  helperText={errors.contact} // Display error message
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email"
                  value={staffData.email}
                  onChange={handleChange}
                  error={!!errors.email} // Show error if exists
                  helperText={errors.email} // Display error message
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  style={{ marginTop: 16, backgroundColor: '#CC5500' }}
                >
                  Update Employee
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
                  marginLeft:'20px',
                  marginTop: '40px'
                }}
              >
                <img src={RegisterImg} alt="Registration" style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} />
              </Box>
            
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default UpdateStaff;
