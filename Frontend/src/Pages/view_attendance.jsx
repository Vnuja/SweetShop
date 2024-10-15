import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import styled from 'styled-components';

// Styled Calendar Container
const CalendarContainer = styled(Box)`
  margin-left: 20px; /* Adjust as needed */
  margin-top: 0; /* Remove if not needed */
  border: 1px solid #ccc; /* Border around the calendar */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  background-color: #ffffff; /* Background color */
  overflow: hidden; /* To contain child elements */
`;

// Styled Calendar
const StyledCalendar = styled(Calendar)`
  .react-calendar {
    width: 100%; /* Full width */
    max-width: 400px; /* Maximum width */
    border: none; /* Remove default border */
    border-radius: 8px; /* Rounded corners */
    overflow: hidden; /* Contain child elements */
  }

  /* Header styles */
  .react-calendar__navigation {
    background-color: #1976d2; /* Header background color */
    color: white; /* Header text color */
  }

  .react-calendar__navigation button {
    color: white; /* Button text color */
    font-size: 16px; /* Button font size */
  }

  /* Day tile styles */
  .react-calendar__tile {
    color: #333; /* Text color for tiles */
    background-color: #f9f9f9; /* Default background color for tiles */
    border-radius: 8px; /* Rounded corners for tiles */
    transition: background-color 0.3s; /* Smooth transition for hover effect */
  }

  /* Highlighted tile styles */
  .react-calendar__tile--active {
    background-color: #1976d2; /* Active tile background */
    color: white; /* Active tile text color */
  }

  /* Hover styles for tiles */
  .react-calendar__tile:hover {
    background-color: #e3f2fd; /* Light blue background on hover */
    color: #1976d2; /* Change text color on hover */
  }

  /* Other optional styles */
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #aaa; /* Style for neighboring month days */
  }
`;

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [dateMarked, setDateMarked] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const staffId = user._id;

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const attendanceResponse = await axios.get(`http://localhost:3001/attendance/${staffId}`);
        setAttendanceRecords(attendanceResponse.data);
  
        const leaveResponse = await axios.get(`http://localhost:3001/leaves/${staffId}`);
        setLeaveRecords(leaveResponse.data);
  
        // Prepare dates for marking on the calendar
        const markedDates = {};
  
        // Mark attendance dates
        attendanceResponse.data.forEach(record => {
          const date = new Date(record.date).toLocaleDateString();
          markedDates[date] = record.status === 'Present' ? 'present' : 'absent'; // Use status as key
        });
  
        // Mark leave dates
        leaveResponse.data.forEach(record => {
          const startDate = new Date(record.startDate); // Adjust according to your leave record structure
          const endDate = new Date(record.endDate);
          
          // Loop through the range of dates
          for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateString = d.toLocaleDateString();
            markedDates[dateString] = 'leave'; 
          }
        });
  
        setDateMarked(markedDates);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchAttendance();
  }, [staffId]);

  // Function to get tile class name for marking dates
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toLocaleDateString();
      return dateMarked[dateString] ? `highlight ${dateMarked[dateString]}` : null; // Return appropriate class
    }
    return null;
  };

  return (
    <Box style={{ display: 'flex', padding: '40px' }}>
      <Box style={{ 
          backgroundColor: '#f9f9f9', 
          borderRadius: 12, 
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', 
          width: '550px',  // Increased width
          padding: '20px' 
      }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          style={{ 
            fontWeight: 'bold', 
            color: 'green', 
            textAlign: 'center',
            marginBottom: '20px' 
          }}
        >
          Attendance Records
        </Typography>
        
        <Box component="ul" style={{ listStyle: 'none', padding: 0 }}>
          {attendanceRecords.map((record) => (
            <Box 
              key={record._id} 
              component="li" 
              style={{ 
                padding: '16px', 
                backgroundColor: 'white', 
                borderRadius: 8, 
                boxShadow: '0px 2px 8px rgba(0,0,0,0.1)', 
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body1" style={{ fontWeight: '500' }}>
                {new Date(record.date).toLocaleDateString()} 
              </Typography>
              <Typography 
                variant="body2" 
                style={{ 
                  fontWeight: 'bold', 
                  color: record.status === 'Present' ? 'green' : 'red' 
                }}
              >
                {record.status}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      
      <CalendarContainer>
        <StyledCalendar
          tileClassName={tileClassName} // Add the function to highlight dates
        />
      </CalendarContainer>

      <style jsx>{`
        .react-calendar__tile.highlight.present {
          background-color: rgba(0, 128, 0, 0.3); /* Light green for present */
        }

        .react-calendar__tile.highlight.absent {
          background-color: rgba(255, 0, 0, 0.3); /* Light red for absent */
        }

        .react-calendar__tile.highlight.leave {
          background-color: rgba(0, 0, 255, 0.3); /* Light blue for leave */
        }
      `}</style>
    </Box>
  );
};

export default ViewAttendance;
