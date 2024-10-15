import React, { useEffect, useState } from 'react';
import UserHeader from '../Components/UserHeader';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MarkAttendance from './mark_attendance';
import ViewAttendance from './view_attendance';
import ApplyLeave from './apply_leave';
import ViewLeaves from './view_leaves';
import Header from '../Components/customer_header';
import Footer from '../Components/customer_footer';
import Sidebar from '../Components/attendance_sidebar'; // Import your Sidebar component

const UserDashboard = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <UserHeader />
            <div style={{ display: 'flex', flex: 1 }}>
                <Sidebar /> 
                <div style={{ flex: 1, padding: '16px' }}>
                    
                    <Routes>
                        <Route path='/' element={<MarkAttendance />} />
                        <Route path='/view' element={<ViewAttendance />} />
                        <Route path='/apply-leave' element={<ApplyLeave />} />
                        <Route path='/my-leave' element={<ViewLeaves />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserDashboard;
