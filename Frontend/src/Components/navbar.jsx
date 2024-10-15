import React from 'react';
import { Box, Typography, IconButton } from '@material-ui/core';
import Exit from '@material-ui/icons/ExitToApp';
import userAvatar from '../Images/profile.png'; // Replace with actual user avatar
import './header.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <Box className="header">
    </Box>
  );
};

export default Header;
