import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const MarkAttendance = () => {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Present');
  const [errors, setErrors] = useState({});
  const [leaveDates, setLeaveDates] = useState([]); // State to hold leave dates

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveDates = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const staffId = user._id;
        const response = await axios.get(`http://localhost:3001/leaves/${staffId}`);
        // Extract leave dates and format them to match the date input format
        const dates = response.data.map(record => {
          const startDate = new Date(record.startDate);
          const endDate = new Date(record.endDate);
          const leaveDatesArray = [];

          // Loop through the range of leave dates
          for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            leaveDatesArray.push(d.toISOString().split('T')[0]); // Convert to YYYY-MM-DD
          }

          return leaveDatesArray;
        }).flat();

        setLeaveDates(dates); // Flatten the array
      } catch (error) {
        console.error("Error fetching leave dates:", error);
      }
    };

    fetchLeaveDates();
  }, []);

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, date: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the selected date is in the leave dates
    if (leaveDates.includes(date)) {
      setErrors((prevErrors) => ({ ...prevErrors, date: 'You cannot mark attendance on a leave date.' }));
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const staffId = user._id;
      await axios.post('http://localhost:3001/attendance/mark', { staffId, status, date });
      swal("Success", "Attendance marked successfully!", "success");
      navigate("/user/view");
    } catch (error) {
      console.error(error);
      swal("Error", "Failed to mark attendance. Please try again.", "error");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ padding: '40px', backgroundColor: 'white', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: 'green', textAlign: 'center' }}>
        Mark Attendance
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          value={date}
          onChange={handleDateChange}
          error={!!errors.date}
          helperText={errors.date}
        />
        <Button fullWidth variant="contained" color="primary" size="large" type="submit" style={{ marginTop: 16, backgroundColor:'#CC5500' }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default MarkAttendance;
