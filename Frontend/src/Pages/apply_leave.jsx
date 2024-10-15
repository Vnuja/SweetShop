import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert';

const ApplyLeave = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const staffId = user._id;

  const validateDates = () => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Reset error state
    setError('');

    // Check if the start date is in the past
    if (start < today) {
      setError('Start date cannot be in the past.');
      return false;
    }

    // Check if the end date is before the start date
    if (end < start) {
      setError('End date cannot be before the start date.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate dates before submission
    if (!validateDates()) {
      return;
    }

    try {
      await axios.post(`http://localhost:3001/leaves/apply/${staffId}`, { staffId, startDate, endDate, reason });
      swal("Success", "Leave applied successfully!", "success");
      // Reset form fields
      setStartDate('');
      setEndDate('');
      setReason('');
    } catch (error) {
      console.error(error);
      swal("Error", "Failed to apply for leave. Please try again.", "error");
    }
  };

  return (
    <>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ padding: '40px', backgroundColor: 'white', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
      <Typography variant="h4" gutterBottom style={{fontWeight: 'bold', color: 'green', textAlign: 'center' }}>
        Apply for Leave
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          error={!!error} // Show error state if there's an error
          helperText={error && error.includes('Start date') ? error : ''}
        />
        <TextField
          fullWidth
          margin="normal"
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          error={!!error} // Show error state if there's an error
          helperText={error && error.includes('End date') ? error : ''}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button fullWidth variant="contained" color="primary" size="large" type="submit" style={{ marginTop: 16, backgroundColor:'#CC5500' }}>
          Apply
        </Button>
      </form>
    </Box>
    </>
  );
};

export default ApplyLeave;
