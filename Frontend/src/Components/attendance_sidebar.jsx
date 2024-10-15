// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { FaHome, FaSignInAlt, FaClipboardList, FaUserCheck, FaRegFileAlt } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../Images/candy.png'; 

// Styled Logo Component
const Logo = styled(Typography)`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ffffff; // Logo color
`;

// Styled Sidebar Container with Gradient Background
const SidebarContainer = styled(Box)`
    width: 220px;
    height: 100vh;
    background: linear-gradient(to bottom, #1976d2, #0d47a1); // Gradient background
    padding: 20px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
`;

// Styled ListItem with hover effect
const StyledListItem = styled(ListItem)`
    &:hover {
        background-color: #2196f3; // Slightly darker blue on hover
        border-radius: 5px;
    }
    color: #ffffff; // Text color
`;

// Styled Logo Component
const LogoContainer = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const LogoImage = styled.img`
    width: 100px; // Adjust the width as needed
    height: auto; // Maintain aspect ratio
`;

const LogoText = styled(Typography)`
    font-size: 24px;
    font-weight: bold;
    color: #1976d2; // Primary color
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            {/* Logo Section */}
            <LogoContainer>
                <LogoImage src={logo} alt="Your Logo" /> {/* Add your logo image path */}
            </LogoContainer>

            {/* Menu List */}
            <List>
                <StyledListItem button component={Link} to="/user">
                    <FaClipboardList style={{ marginRight: 8 }} />
                    <ListItemText primary="Mark Attendance" />
                </StyledListItem>
                <StyledListItem button component={Link} to="/user/view">
                    <FaUserCheck style={{ marginRight: 8 }} />
                    <ListItemText primary="View Attendance" />
                </StyledListItem>
                <StyledListItem button component={Link} to="/user/apply-leave">
                    <FaRegFileAlt style={{ marginRight: 8 }} />
                    <ListItemText primary="Apply Leave" />
                </StyledListItem>
                <StyledListItem button component={Link} to="/user/my-leave">
                    <FaSignInAlt style={{ marginRight: 8 }} />
                    <ListItemText primary="My Leaves" />
                </StyledListItem>
            </List>

            {/* Home and Sign Out */}
            <Box mt={2}>
                <StyledListItem button component={Link} to="/home">
                    <FaHome style={{ marginRight: 8 }} />
                    <ListItemText primary="Home" />
                </StyledListItem>
                <StyledListItem button component={Link} to="/signout">
                    <FaSignInAlt style={{ marginRight: 8 }} />
                    <ListItemText primary="Sign Out" />
                </StyledListItem>
            </Box>
        </SidebarContainer>
    );
};

export default Sidebar;
