import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import swal from 'sweetalert';
import Header from '../Components/customer_header'; 
import Sidebar from '../Components/sidebar';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../Components/customer_footer';

const useStyles = makeStyles((theme) => ({
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
    minHeight: '80vh',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
  },
  searchContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'flex-end', // Aligns the search input to the right
    gap: '10px',
    width: '100%', // Ensures full width
  },
  searchField: {
    width: '300px',
  },
  formControl: {
    minWidth: 120,
  },
}));

const ViewAllAttendance = () => {
  const classes = useStyles();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState('staffName');

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3001/attendance');
      setAttendanceRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error(error);
      swal("Error", "Failed to load attendance records.", "error");
    } 
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const handleSearch = () => {
    const searchResults = attendanceRecords.filter((record) => {
      switch (searchCriteria) {
        case 'staffName':
          return record.staffId && record.staffId.name.toLowerCase().includes(searchTerm.toLowerCase());
        case 'status':
          return record.status.toLowerCase().includes(searchTerm.toLowerCase());
        case 'date':
          return new Date(record.date).toLocaleDateString().includes(searchTerm);
        default:
          return false;
      }
    });
    setFilteredRecords(searchResults);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, searchCriteria]);

  return (
    <Box>
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box className={classes.contentContainer}>
          <Typography
            variant="h4"
            gutterBottom
            style={{ marginBottom: '20px', fontWeight: 'bold', color: 'green', textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}
          >
            Employee Attendance Records
          </Typography>

          {/* Search Input */}
          <Box className={classes.searchContainer}>
            <FormControl className={classes.formControl}>
              <InputLabel id="search-criteria-label">Search By</InputLabel>
              <Select
                labelId="search-criteria-label"
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
              >
                <MenuItem value="staffName">Staff Name</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="date">Date</MenuItem>
              </Select>
            </FormControl>
            <TextField
              className={classes.searchField}
              label="Enter Search Term"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          {/* Attendance Records Table */}
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: 'purple', color: 'white' }}>
                  <TableCell style={{ color: 'white' }}>Staff ID</TableCell>
                  <TableCell style={{ color: 'white' }}>Staff Name</TableCell>
                  <TableCell style={{ color: 'white' }}>Status</TableCell>
                  <TableCell style={{ color: 'white' }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>{record.staffId ? record.staffId._id.substring(0,5) : 'Unknown Staff ID'}</TableCell>
                    <TableCell>
                      {record.staffId ? record.staffId.name : 'Unknown Staff ID'}
                    </TableCell>
                    <TableCell>{record.status}</TableCell>
                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
};

export default ViewAllAttendance;
