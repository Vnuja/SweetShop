import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, MenuItem } from '@material-ui/core';
import Sidebar from '../../Components/sidebar';
import Header from '../../Components/navbar';
import axios from 'axios';
import swal from 'sweetalert';
import MainHeader from '../../Components/customer_header'; 
import Footer from '../../Components/customer_footer';
import supplierImage from '../../Images/inventory.png'; 

const UpdateSupplier = () => {
  const { id } = useParams(); // Get the supplier ID from the URL
  const navigate = useNavigate();
  const [supplierData, setSupplierData] = useState({
    supplierId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    supplierCategory: '',
    contactPerson: '',
    accountNumber: '',
    bank: '',
    branch: '',
  });
  const [errors, setErrors] = useState({}); // State for error messages

  // Updated Supplier categories
  const supplierCategories = [
    'Confectionery Ingredients Suppliers',
    'Chocolate Suppliers',
    'Packaging Suppliers',
    'Baking Equipment Suppliers',
    'Decoration Suppliers'
  ];

  // List of Sri Lankan Banks
  const banks = [
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
  const branches = [
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


  // Fetch the supplier data when the component mounts
  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/supplier/get-supplier/${id}`);
        setSupplierData(response.data);
      } catch (error) {
        console.error("There was an error fetching the supplier data!", error);
      }
    };

    fetchSupplierData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const validateFields = () => {
    const newErrors = {};

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(supplierData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate Phone
    if (!/^\d{10}$/.test(supplierData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits long.";
    }

    // Validate Account Number
    if (!supplierData.accountNumber) {
      newErrors.accountNumber = "Account number is required.";
    } else if (supplierData.accountNumber.length < 5) {
      newErrors.accountNumber = "Account number must be at least 5 digits long.";
    } else if (!/^\d+$/.test(supplierData.accountNumber)) {
      newErrors.accountNumber = "Account number must contain only numbers.";
    }

    // Validate required fields
    Object.keys(supplierData).forEach(key => {
      if (!supplierData[key] && key !== 'supplierId') {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });

    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(validateFields());
    if (!validateFields()) {
      return; // Do not submit if there are validation errors
    } 

   const updatedSupplierData = {
     ...supplierData,
     __v: supplierData.__v,
   };

   console.log(updatedSupplierData);

    try {
        console.log('Hi');
      await axios.put(`http://localhost:3001/supplier/update-supplier/${id}`, updatedSupplierData);
      swal("Success", "Supplier details updated successfully!", "success");
      navigate('/admin/view-supplier');
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
              Update Supplier Details
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
              <Box component="form" width="60%" noValidate autoComplete="off" onSubmit={handleSubmit} style={{marginRight:'305px'}}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Supplier ID"
                  variant="outlined"
                  name="supplierId"
                  value={supplierData.supplierId}
                  onChange={handleChange}
                  disabled // Freeze the supplier ID
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={supplierData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={supplierData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email"
                  value={supplierData.email}
                  onChange={handleChange}
                  error={!!errors.email} // Show error if exists
                  helperText={errors.email} // Display error message
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone"
                  variant="outlined"
                  name="phone"
                  value={supplierData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Address"
                  variant="outlined"
                  name="address"
                  value={supplierData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Supplier Category"
                  variant="outlined"
                  name="supplierCategory"
                  select // Make it a dropdown
                  value={supplierData.supplierCategory}
                  onChange={handleChange}
                  error={!!errors.supplierCategory}
                  helperText={errors.supplierCategory}
                >
                  {supplierCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Contact Person"
                  variant="outlined"
                  name="contactPerson"
                  value={supplierData.contactPerson}
                  onChange={handleChange}
                  error={!!errors.contactPerson}
                  helperText={errors.contactPerson}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Account Number"
                  variant="outlined"
                  name="accountNumber"
                  value={supplierData.accountNumber}
                  onChange={handleChange}
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber}
                  inputProps={{ 
                    pattern: "[0-9]*", 
                    inputMode: "numeric", 
                    style: { 
                      MozAppearance: 'textfield', 
                    },
                  }}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Bank"
                  variant="outlined"
                  name="bank"
                  select // Make it a dropdown
                  value={supplierData.bank}
                  onChange={handleChange}
                  error={!!errors.bank}
                  helperText={errors.bank}
                >
                  {banks.map((bank) => (
                    <MenuItem key={bank} value={bank}>
                      {bank}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Branch"
                  variant="outlined"
                  name="branch"
                  select // Make it a dropdown
                  value={supplierData.branch}
                  onChange={handleChange}
                  error={!!errors.branch}
                  helperText={errors.branch}
                >
                  {branches.map((branch) => (
                    <MenuItem key={branch} value={branch}>
                      {branch}
                    </MenuItem>
                  ))}
                </TextField>
                
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginTop: '20px' }}
                >
                  Update Supplier
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
                top: '266px',           
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

export default UpdateSupplier;
