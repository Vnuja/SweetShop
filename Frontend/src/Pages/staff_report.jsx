import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Components/sidebar';
import logo from '../Images/candy.png'; // Adjust the path if needed
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import MainHeader from '../Components/customer_header'; 
import Footer from '../Components/customer_footer';

// CSS for print
const styles = `
@media print {
  body * {
    visibility: hidden;
  }
  .printable-area, .printable-area * {
    visibility: visible;
  }
  .printable-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    border: 2px solid #000; /* Border added around the printable area */
  }
  .no-print {
    display: none !important;
  }
}
`;

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    borderCollapse: 'collapse', 
  },
  tableContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: 'none', 
    border: 'none',
  },
  letterhead: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: 'rgb(41, 28, 28)', // Light background color
    borderRadius: '8px', // Rounded corners
    '& img': {
      width: '100px',
      height: 'auto',
    },
    '& h4': {
      fontFamily: 'cursive',
      fontWeight: 'bold',
      color: 'yellow',
    },
    '& p': {
      margin: '5px 0',
      color:'white'
    },
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
    '& button': {
      marginLeft: theme.spacing(1),
    },
  },
  tableCell: {
    backgroundColor: 'white', // Ensures the cell background is white
    color: 'black', // Ensures the text color is black
    border: '1px solid #F0EAD6', // Add border to table cells
  },
  tableHeadCell: {
    backgroundColor: 'purple', // Header background color
    color: 'white', // Header text color
    border: '1px solid #F0EAD6', // Add border to header cells
  },
}));

const StaffReport = () => {
  const classes = useStyles();
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        console.log('Fetching staff data...');
        const response = await axios.get('http://localhost:3001/staff/get-staff');
        console.log('Staff data fetched:', response.data);
        setStaffData(response.data);
      } catch (error) {
        console.error('There was an error fetching the staff data!', error);
      }
    };

    fetchStaffData();
  }, []);

  const handleDownloadPDF = () => {
    const input = document.querySelector('.printable-area');
    // Temporarily hide the buttons for generating the PDF
    const buttons = document.querySelectorAll('.no-print-button');
    buttons.forEach(button => button.style.display = 'none');
    
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('staff_report.pdf');
      // Show the buttons again after generating the PDF
      buttons.forEach(button => button.style.display = '');
    });
  };


  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <Box>
      <MainHeader className="no-print" />
      <Box display="flex">
        <Sidebar className="no-print" />
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          className="printable-area"
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            flex: 1,
            margin: '15px',
          }}
        >
          <Box className={classes.letterhead}>
            <img src={logo} alt="Hotel Logo" />
            <Typography variant="h4" gutterBottom>
              Candy Sweet Shop
            </Typography>
            <Typography variant="subtitle2" style={{color:'cyan', fontWeight:'500'}}>
              Address: 182 Galle Road, Colombo Sri Lanka | Phone: 0512 242 020
            </Typography>
            <Typography variant="subtitle1" gutterBottom style={{color:'white', fontWeight:'700', fontSize:'20px'}}>
              Employee Management Report
            </Typography>
          </Box>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="staff table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>ID</TableCell>
                  <TableCell className={classes.tableHeadCell}>Name</TableCell>
                  <TableCell className={classes.tableHeadCell}>DOB</TableCell>
                  <TableCell className={classes.tableHeadCell}>Address</TableCell>
                  <TableCell className={classes.tableHeadCell}>Position</TableCell>
                  <TableCell className={classes.tableHeadCell}>Department</TableCell>
                  <TableCell className={classes.tableHeadCell}>Contact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffData.map((staff) => (
                  <TableRow key={staff._id}>
                    <TableCell className={classes.tableCell}>{staff.staffId}</TableCell>
                    <TableCell className={classes.tableCell}>{staff.name}</TableCell>
                    <TableCell className={classes.tableCell}>{staff.dob.substring(0, 10)}</TableCell>
                    <TableCell className={classes.tableCell}>{staff.address}</TableCell>
                    <TableCell className={classes.tableCell}>{staff.position}</TableCell>
                    <TableCell className={classes.tableCell}>{staff.department}</TableCell>
                    <TableCell className={classes.tableCell}>{staff.contact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className={`${classes.buttonsContainer} no-print-button`}>
            <Button variant="contained" color="secondary" onClick={handleDownloadPDF} style={{backgroundColor:'#CC5500', fontWeight:'600'}}>
              Download PDF
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer/>
    </Box>
  );
};

export default StaffReport;
