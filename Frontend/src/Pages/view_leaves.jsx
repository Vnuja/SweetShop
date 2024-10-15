import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Sidebar from '../Components/sidebar';
import Header from '../Components/customer_header';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';

const ViewLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const staffId = user._id;

  // Fetch leave records for a specific staff member
  const fetchLeaveRecords = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/leaves/${staffId}`);
      console.log('API Response:', response.data); // Log API response
      setLeaves(response.data);
    } catch (error) {
      console.error(error);
      swal('Error', 'Failed to load leave records.', 'error');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchLeaveRecords();
  }, [staffId]);


  return (
    <Box>
      <Box display="flex">
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          style={{ backgroundColor: 'white', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', flex: 1, margin: '15px' }}
        >
          <Box style={{ padding: '20px' }}>
            <Typography
              variant="h4"
              gutterBottom
              style={{
                marginBottom: '20px',
                fontWeight: 'bold',
                color: 'purple',
                textAlign: 'center',
                color:'green'
              }}
            >
              My Leaves
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: 'purple', color: 'white' }}>
                    <TableCell style={{ color: 'white' }}>Leave ID</TableCell>
                    <TableCell style={{ color: 'white' }}>Start Date</TableCell>
                    <TableCell style={{ color: 'white' }}>End Date</TableCell>
                    <TableCell style={{ color: 'white' }}>Reason</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaves.map((leave) => (
                    <TableRow key={leave._id}>
                      <TableCell>{leave._id.substring(0,5)}</TableCell>
                      <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{leave.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewLeaves;
