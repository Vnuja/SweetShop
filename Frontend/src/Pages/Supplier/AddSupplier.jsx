import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import Sidebar from '../../Components/sidebar';
import axios from 'axios';
import swal from 'sweetalert';
import MainHeader from '../../Components/customer_header'; 
import Footer from '../../Components/customer_footer';
import supplierImage from '../../Images/inventory.png'; 

const AddSupplier = () => {
  const [supplierId, setSupplierId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [supplierCategory, setSupplierCategory] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [errors, setErrors] = useState({});

  // Updated Supplier categories
  const supplierCategories = [
    'Confectionery Ingredients Suppliers',
    'Chocolate Suppliers',
    'Packaging Suppliers',
    'Baking Equipment Suppliers',
    'Decoration Suppliers'
  ];

  // List of Sri Lankan Banks
  const bankOptions = [
    'Bank of Ceylon',
    'People’s Bank',
    'Commercial Bank of Ceylon',
    'Hatton National Bank',
    'Sampath Bank',
    'National Development Bank',
    'DFCC Bank',
    'Union Bank of Colombo',
    'Sri Lanka Savings Bank',
    'Seylan Bank',
    'Standard Chartered Bank',
    'Citibank N.A.',
    'HSBC Sri Lanka',
    'Orient Finance',
    'Pan Asia Bank',
    'Amana Bank',
    'Lanka Orix Finance'
  ];

  // List of Sample Bank Branches
  const branchOptions = [
    'Colombo Fort',
    'Colombo 1',
    'Colombo 2',
    'Kandy',
    'Galle',
    'Kurunegala',
    'Jaffna',
    'Negombo',
    'Ratnapura',
    'Anuradhapura',
    'Matara',
    'Nuwara Eliya',
    'Batticaloa',
    'Trincomalee',
    'Dambulla',
    'Badulla',
    'Puttalam',
    'Vavuniya',
    'Mullaitivu',
    'Hambantota',
    'Kegalle',
    'Kalutara',
    'Gampaha',
    'Mirigama',
    'Welisara',
    'Nugegoda',
    'Boralesgamuwa',
    'Pannipitiya',
    'Dehiwala',
    'Moratuwa',
    'Kottawa',
    'Wattala',
    'Maharagama',
    'Thimbirigasyaya',
    'Colombo 5',
    'Colombo 3',
    'Colombo 7',
    'Colombo 4',
    'Colombo 8',
    'Colombo 9',
    'Colombo 10'
  ];

  // Function to generate a unique supplier ID
  const generateSupplierId = () => {
    const id = Math.floor(Math.random() * 10000); // Generates a random ID between 0-9999
    setSupplierId(`SUP${id}`); // Prefix with 'SUP'
  };

  useEffect(() => {
    generateSupplierId(); // Generate ID when component mounts
  }, []);

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
  };

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    setPhone(value);
    setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
  };

  const validateFields = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!emailPattern.test(email)) newErrors.email = "Invalid email format";
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits long";
    }    
    if (!address) newErrors.address = "Address is required";
    if (!supplierCategory) newErrors.supplierCategory = "Supplier category is required";
    if (!contactPerson) newErrors.contactPerson = "Contact person is required";
    if (!accountNumber) {
      newErrors.accountNumber = "Account number is required";
    } else if (accountNumber.length < 5) {
      newErrors.accountNumber = "Account number must be at least 5 digits long";
    }    
    if (!bank) newErrors.bank = "Bank name is required";
    if (!branch) newErrors.branch = "Branch name is required";

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newSupplier = {
      supplierId,
      firstName,
      lastName,
      email,
      phone,
      address,
      supplierCategory,
      contactPerson,
      accountNumber,
      bank,
      branch
    };

    try {
      await axios.post('http://localhost:3001/supplier/add-supplier', newSupplier);
      swal("Success", "New supplier added successfully!", "success");
      // Reset the form fields after successful submission
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setSupplierCategory('');
      setContactPerson('');
      setAccountNumber('');
      setBank('');
      setBranch('');
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
            <Typography variant="h4" gutterBottom style={{ fontFamily: 'cursive', fontWeight: 'bold', color: 'purple', textAlign: 'center', marginTop:'30px' }}>
              Add New Supplier
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
              <Box component="form" width="60%" noValidate autoComplete="off" onSubmit={handleSubmit} style={{marginRight:'350px'}}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Supplier ID"
                  variant="outlined"
                  value={supplierId}
                  disabled 
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
                  }}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
                  }}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
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
                  label="Phone"
                  variant="outlined"
                  value={phone}
                  onChange={handlePhoneChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
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

                {/* Supplier Category Dropdown */}
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Supplier Category</InputLabel>
                  <Select
                    value={supplierCategory}
                    onChange={(e) => {
                      setSupplierCategory(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, supplierCategory: '' }));
                    }}
                    error={!!errors.supplierCategory}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {supplierCategories.map((category) => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                  {errors.supplierCategory && (
                    <Typography color="error" variant="caption">{errors.supplierCategory}</Typography>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  margin="normal"
                  label="Contact Person"
                  variant="outlined"
                  value={contactPerson}
                  onChange={(e) => {
                    setContactPerson(e.target.value);
                    setErrors((prevErrors) => ({ ...prevErrors, contactPerson: '' }));
                  }}
                  error={!!errors.contactPerson}
                  helperText={errors.contactPerson}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Account Number"
                  type='text' // Change from 'number' to 'text'
                  variant="outlined"
                  value={accountNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only digits and update state
                    if (/^\d*$/.test(value)) {
                      setAccountNumber(value);
                      setErrors((prevErrors) => ({ ...prevErrors, accountNumber: '' }));
                    }
                  }}
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber}
                />


                {/* Bank Dropdown */}
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Bank</InputLabel>
                  <Select
                    value={bank}
                    onChange={(e) => {
                      setBank(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, bank: '' }));
                    }}
                    error={!!errors.bank}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {bankOptions.map((bankName) => (
                      <MenuItem key={bankName} value={bankName}>{bankName}</MenuItem>
                    ))}
                  </Select>
                  {errors.bank && (
                    <Typography color="error" variant="caption">{errors.bank}</Typography>
                  )}
                </FormControl>

                {/* Branch Dropdown */}
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Branch</InputLabel>
                  <Select
                    value={branch}
                    onChange={(e) => {
                      setBranch(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, branch: '' }));
                    }}
                    error={!!errors.branch}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {branchOptions.map((branchName) => (
                      <MenuItem key={branchName} value={branchName}>{branchName}</MenuItem>
                    ))}
                  </Select>
                  {errors.branch && (
                    <Typography color="error" variant="caption">{errors.branch}</Typography>
                  )}
                </FormControl>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px' }}
                >
                  Add Supplier
                </Button>
              </Box>
            </Box>
            <Box
              component="img"
              src={supplierImage}
              alt="supplier"
              style={{
                maxWidth: '307px',
                margin: '15px',
                position: 'absolute',  
                top: '305px',           
                right: '70px',         
              }}
            />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AddSupplier;
