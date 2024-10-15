import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem, FormControl, Select, InputLabel, TablePagination } from '@material-ui/core';
import Sidebar from '../../Components/sidebar';
import Header from '../../Components/customer_header'; 
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/customer_footer';

// Custom Pagination Component
const CustomPagination = ({ count, page, rowsPerPage, onPageChange }) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      rowsPerPageOptions={[]} 
      labelRowsPerPage="" 
    />
  );
};

const useStyles = makeStyles((theme) => ({
  searchField: {
    marginBottom: '20px',
    width: '300px',
    borderRadius: '25px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '25px',
      padding: '5px 10px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '8px 14px',
      fontSize: '14px',
    },
  },
  criteriaSelect: {
    marginRight: '45px',
    minWidth: '150px',
    marginBottom: '30px',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    flex: 1,
    margin: '15px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '80vh', // Ensures the container doesn't shrink too much
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
  },
}));

const ViewSupplier = () => {
  const classes = useStyles();
  const [supplierData, setSupplierData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("firstName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/supplier/get-suppliers');
        setSupplierData(response.data);
      } catch (error) {
        console.error("There was an error fetching the supplier data!", error);
      }
    };

    fetchSupplierData();
  }, []);

  const handleUpdate = (supplierId) => {
    console.log(`Update supplier with ID: ${supplierId}`);
    navigate(`/admin/update-supplier/${supplierId}`); // Navigate to the update page with the supplier ID
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/supplier/delete-supplier/${id}`);
      setSupplierData(supplierData.filter(supplier => supplier._id !== id));
    } catch (error) {
      console.error("There was an error deleting the supplier!", error);
    }
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredSuppliers = supplierData.filter(supplier => {
    if (!searchQuery) return true;
    const field = supplier[searchCriteria]?.toString().toLowerCase();
    return field?.startsWith(searchQuery.toLowerCase());
  });

  const paginatedSuppliers = filteredSuppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box className={classes.contentContainer}  style={{ overflowX: 'auto' }}>
          <Box
            alignItems="center"
            justifyContent="space-between"
            marginTop={"60px"}
            width="100%"
            display="flex"
            flexDirection="row"
          >
            <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', fontWeight: 'bold', color: 'green', textAlign: 'center' }}>
              View All Suppliers
            </Typography>
            <Box display="flex" alignItems="center">
              <FormControl className={classes.criteriaSelect}>
                <InputLabel>Search By</InputLabel>
                <Select
                  value={searchCriteria}
                  onChange={handleCriteriaChange}
                  label="Search By"
                >
                  <MenuItem value="firstName">First Name</MenuItem>
                  <MenuItem value="lastName">Last Name</MenuItem>
                  <MenuItem value="phone">Phone</MenuItem>
                  <MenuItem value="supplierCategory">Category</MenuItem>
                  <MenuItem value="contactPerson">Contact Person</MenuItem>
                  <MenuItem value="accountNumber">Account No</MenuItem>
                  <MenuItem value="bank">Bank</MenuItem>
                  <MenuItem value="branch">Branch</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                placeholder={`Search by ${searchCriteria}`}
                value={searchQuery}
                onChange={handleSearchQueryChange}
                className={classes.searchField}
              />
            </Box>
          </Box>
          <TableContainer component={Paper} className={classes.tableContainer} >
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: 'purple', color: 'white' }}>
                    <TableCell style={{ color: 'white' }}>Supplier ID</TableCell>
                    <TableCell style={{ color: 'white' }}>First Name</TableCell>
                    <TableCell style={{ color: 'white' }}>Last Name</TableCell>
                    <TableCell style={{ color: 'white' }}>Phone</TableCell>
                    <TableCell style={{ color: 'white' }}>Address</TableCell>
                    <TableCell style={{ color: 'white' }}>Category</TableCell>
                    <TableCell style={{ color: 'white' }}>Contact Person</TableCell>
                    <TableCell style={{ color: 'white' }}>Account Number</TableCell>
                    <TableCell style={{ color: 'white' }}>Bank</TableCell>
                    <TableCell style={{ color: 'white' }}>Branch</TableCell>
                    <TableCell style={{ color: 'white' }}>Email</TableCell>
                    <TableCell style={{ color: 'white' }}>Update</TableCell>
                    <TableCell style={{ color: 'white' }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedSuppliers.map((supplier) => (
                    <TableRow key={supplier._id}>
                      <TableCell>{supplier.supplierId}</TableCell>
                      <TableCell>{supplier.firstName}</TableCell>
                      <TableCell>{supplier.lastName}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>{supplier.address}</TableCell>
                      <TableCell>{supplier.supplierCategory}</TableCell>
                      <TableCell>{supplier.contactPerson}</TableCell>
                      <TableCell>{supplier.accountNumber}</TableCell>
                      <TableCell>{supplier.bank}</TableCell>
                      <TableCell>{supplier.branch}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ backgroundColor: 'orange', borderRadius: '100px' }}
                          onClick={() => handleUpdate(supplier._id)}
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          style={{ borderRadius: '100px' }}
                          onClick={() => handleDelete(supplier._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TableContainer>

          <CustomPagination
            count={filteredSuppliers.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ViewSupplier;
