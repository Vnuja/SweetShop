import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@material-ui/core';
import ExitIcon from '@material-ui/icons/ExitToApp'; 
import './header.css'; 
import { Link, useNavigate } from 'react-router-dom';

const UserHeader = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <Box className="header">
            <Box className="title" 
                 sx={{
                     display: 'flex',
                     justifyContent: 'center', 
                     alignItems: 'center',    
                 }}
            >
                <Typography variant="body1" className="user-name">
                    Hello ! {user && user.name}
                </Typography>
                <Typography variant="h6" className='title' style={{marginLeft:'430px'}}>
                    My Dashboard
                </Typography>
            </Box>

            <Box className="user-section">
                <IconButton onClick={logout} color="inherit">
                    <ExitIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default UserHeader