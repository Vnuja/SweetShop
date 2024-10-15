import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@material-ui/core';
import Sidebar from '../Components/sidebar';
import Header from '../Components/navbar';
import axios from 'axios';
import swal from 'sweetalert';
import MainHeader from '../Components/customer_header'; 
import Footer from '../Components/customer_footer';

const AddStaff = () => {
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [staffId, setStaffId] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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
    if (/^0[0-9]*$/.test(value) && value.length <= 10) {
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

  const validateFields = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!staffId) newErrors.staffId = "Staff ID is required";
    if (!name) newErrors.name = "Name is required";
    if (!dob) {
      newErrors.dob = "Date of Birth is required";
    } else if (validateAge(dob) < 18) {
      newErrors.dob = "User must be at least 18 years old";
    }
    if (!address) newErrors.address = "Address is required";
    if (!position) newErrors.position = "Position is required";
    if (!department) newErrors.department = "Department is required";
    if (!contact) newErrors.contact = "Contact number is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (!emailPattern.test(email)) newErrors.email = "Invalid email format";

    return newErrors;
  };

  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newStaff = {
      staffId,
      name,
      dob,
      address,
      position,
      department,
      contact,
      email,
      password
    };

    try {
      await axios.post('http://localhost:3001/staff/add-staff', newStaff);
      swal("Success", "New staff member added successfully!", "success");
      // Reset the form fields after successful submission
      setStaffId('');
      setName('');
      setDob('');
      setAddress('');
      setPosition('');
      setDepartment('');
      setContact('');
      setPassword('');
      setEmail('');
      setErrors({});
    } catch (error) {
      console.error(error);
      swal("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <Box>
      <MainHeader />
      <Box display="flex">
        <Sidebar />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          style={{ backgroundColor: 'white', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', flex: 1, margin: '15px' }}
        >
          <Box alignItems="center" justifyContent="center">
            <Typography variant="h4" gutterBottom style={{ fontFamily: 'cursive', fontWeight: 'bold', color: 'purple', textAlign: 'center' }}>
              Add New Staff Member
            </Typography>
          </Box>

          <Box display="flex" width="100%">
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
                  value={staffId}
                  onChange={(e) => {
                    setStaffId(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, staffId: '' }));
                  }}
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
                  onChange={(e) => {
                    setDob(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, dob: '' }));
                  }}
                  error={!!errors.dob}
                  helperText={errors.dob}
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
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.position}>
                  <InputLabel>Position</InputLabel>
                  <Select
                    value={position}
                    onChange={handlePositionChange}
                    label="Position"
                  >
                    <MenuItem value="General Manager">General Manager</MenuItem>
                    <MenuItem value="Assistant Manager">Assistant Manager</MenuItem>
                    <MenuItem value="Front Desk Staff">Front Desk Staff</MenuItem>
                    <MenuItem value="Concierge">Concierge</MenuItem>
                    <MenuItem value="Housekeeping Staff">Housekeeping Staff</MenuItem>
                    <MenuItem value="Maintenance Staff">Maintenance Staff</MenuItem>
                    <MenuItem value="Food and Beverage Staff">Food and Beverage Staff</MenuItem>
                    <MenuItem value="Event and Banquet Staff">Event and Banquet Staff</MenuItem>
                    <MenuItem value="Sales and Marketing Staff">Sales and Marketing Staff</MenuItem>
                    <MenuItem value="Security Staff">Security Staff</MenuItem>
                    <MenuItem value="Spa and Recreation Staff">Spa and Recreation Staff</MenuItem>
                    <MenuItem value="Valet and Bell Staff">Valet and Bell Staff</MenuItem>
                  </Select>
                  {errors.position && <Typography color="error">{errors.position}</Typography>}
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.department}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={department}
                    onChange={handleDepartmentChange}
                    label="Department"
                  >
                    <MenuItem value="Administration/Management">Administration/Management</MenuItem>
                    <MenuItem value="Front Office/Guest Services">Front Office/Guest Services</MenuItem>
                    <MenuItem value="Housekeeping">Housekeeping</MenuItem>
                    <MenuItem value="Maintenance/Engineering">Maintenance/Engineering</MenuItem>
                    <MenuItem value="Food and Beverage">Food and Beverage</MenuItem>
                    <MenuItem value="Security/Safety">Security/Safety</MenuItem>
                  </Select>
                  {errors.department && <Typography color="error">{errors.department}</Typography>}
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Contact"
                  variant="outlined"
                  value={contact}
                  onChange={handleContactChange}
                  inputProps={{ pattern: "0[0-9]{9}" }} 
                  error={!!errors.contact}
                  helperText={errors.contact}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  style={{ marginTop: 16 }}
                >
                  Add Member
                </Button>
              </Box>
            </Box>
            
            <Box
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '20px',
                margin: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-6/275045168_334568021941455_6940184566715759617_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=aPbU2tOdUoUQ7kNvgGlIQ3V&_nc_ht=scontent.fcmb1-2.fna&oh=00_AYBac6Bp9YqbFC_hUKA9XM0kGdl1rgWTwzKb--K_ougZOg&oe=66B579E5"
                alt="Sample"
                style={{ maxWidth: '100%', borderRadius: 8 }}
              />
            </Box>
          </Box>
          
        </Box>
      </Box>
      <Footer/>
    </Box>
  );
};

export default AddStaff;
