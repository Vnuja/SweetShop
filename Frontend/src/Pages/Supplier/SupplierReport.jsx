import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../../Components/sidebar';
import logo from '../../Images/candy.png'; // Adjust the path if needed
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import MainHeader from '../../Components/customer_header'; 
import Footer from '../../Components/customer_footer';

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
    border: 2px solid #000;
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
    backgroundColor: 'rgb(41, 28, 28)',
    borderRadius: '8px',
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
      color: 'white',
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
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid #F0EAD6',
  },
  tableHeadCell: {
    backgroundColor: 'purple',
    color: 'white',
    border: '1px solid #F0EAD6',
  },
}));

const SupplierReport = () => {
  const classes = useStyles();
  const [supplierData, setSupplierData] = useState([]);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        console.log('Fetching supplier data...');
        const response = await axios.get('http://localhost:3001/supplier/get-suppliers');
        console.log('Supplier data fetched:', response.data);
        setSupplierData(response.data);
      } catch (error) {
        console.error('There was an error fetching the supplier data!', error);
      }
    };

    fetchSupplierData();
  }, []);

  const handleDownloadPDF = () => {
    const input = document.querySelector('.printable-area');
    const buttons = document.querySelectorAll('.no-print-button');
    buttons.forEach(button => button.style.display = 'none');
    
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('supplier_report.pdf');
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
              Supplier Management Report
            </Typography>
          </Box>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="supplier table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>ID</TableCell>
                  <TableCell className={classes.tableHeadCell}>First Name</TableCell>
                  <TableCell className={classes.tableHeadCell}>Last Name</TableCell>
                  <TableCell className={classes.tableHeadCell}>Phone</TableCell>
                  <TableCell className={classes.tableHeadCell}>Address</TableCell>
                  <TableCell className={classes.tableHeadCell}>Supplier Category</TableCell>
                  <TableCell className={classes.tableHeadCell}>Contact Person</TableCell>
                  <TableCell className={classes.tableHeadCell}>Account Number</TableCell>
                  <TableCell className={classes.tableHeadCell}>Bank</TableCell>
                  <TableCell className={classes.tableHeadCell}>Branch</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supplierData.map((supplier) => (
                  <TableRow key={supplier._id}>
                    <TableCell className={classes.tableCell}>{supplier.supplierId}</TableCell>
                    <TableCell className={classes.tableCell}>{supplier.firstName}</TableCell>
                    <TableCell className={classes.tableCell}>{supplier.lastName}</TableCell>
                    <TableCell className={classes.tableCell}>{supplier.phone}</TableCell>
                    <TableCell className={classes.tableCell}>{supplier.address}</TableCell>
                    <TableCell className={classes.tableCell}>{supplier.supplierCategory}</TableCell>
                    <TableCell className={classes.tableCell}>{supplier.contactPerson}</TableCell>
                    <TableCell className={classes.tableCell}>{supplier.accountNumber}</TableCell>
                    <TableCell className={classes.tableCell}>{supplier.bank}</TableCell>
                    <TableCell className={classes.tableCell}>{supplier.branch}</TableCell>
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
      <Footer />
    </Box>
  );
};

export default SupplierReport;
