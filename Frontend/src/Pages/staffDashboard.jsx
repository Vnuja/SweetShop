import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUsers, FaClipboardList, FaConciergeBell, FaTools, FaUtensils, FaBed, FaKey, FaShuttleVan, FaPhone, FaTachometerAlt, FaDesktop, FaBeer, FaBullhorn  } from 'react-icons/fa';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import Sidebar from '../Components/sidebar';
import Header from '../Components/navbar';
import MainHeader from '../Components/customer_header'; 
import Footer from '../Components/customer_footer';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainSection = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SidebarWrapper = styled.div`
  width: 250px; /* Fixed width for the sidebar */
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const CardWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: ${(props) => props.color || '#fff'};
  width: 30%; /* Adjusted width to fit 3 cards per row */
  min-height: 150px;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: hidden; /* Ensure text does not overflow */
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    background-color: ${(props) => props.color ? darkenColor(props.color, 0.1) : '#ddd'}; /* Slightly darker color */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
    cursor: pointer;
  }
`;

const FullWidthCard = styled(Card)`
  width: 100%;
  background-color: ${(props) => props.color || '#fff'}; /* Custom color for full-width card */
`;

const IconWrapper = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  overflow: hidden; /* Ensure title does not overflow */
  text-overflow: ellipsis; /* Add ellipsis for overflow text */
  white-space: nowrap; /* Prevent text wrapping */
`;

const Count = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const colors = [
  "#4CAF50", // Green
  "#FFC107", // Amber
  "#03A9F4", // Light Blue
  "#9C27B0", // Purple
  "#FF5722", // Deep Orange
  "#795548", // Brown
  "#E91E63", // Pink
  "#009688", // Teal
  "#607D8B", // Blue Grey
  "#8BC34A", // Light Green
  "#CDDC39", // Lime
  "#3F51B5"  // Indigo
];

const icons = {
  "General Manager": <FaTachometerAlt size={40} />,
  "Assistant Manager": <FaUsers size={40} />,
  "Front Desk Staff": <FaConciergeBell size={40} />,
  "Concierge": <FaConciergeBell size={40} />,
  "Housekeeping Staff": <FaBed size={40} />,
  "Maintenance Staff": <FaTools size={40} />,
  "Food and Beverage Staff": <FaUtensils size={40} />,
  "Event and Banquet Staff": <FaBeer size={40} />,
  "Sales and Marketing Staff": <FaBullhorn size={40} />,
  "Security Staff": <FaKey size={40} />,
  "Spa and Recreation Staff": <FaConciergeBell size={40} />,
  "Valet and Bell Staff": <FaShuttleVan size={40} />
};

const positions = [
  "General Manager",
  "Assistant Manager",
  "Front Desk Staff",
  "Concierge",
  "Housekeeping Staff",
  "Maintenance Staff",
  "Food and Beverage Staff",
  "Event and Banquet Staff",
  "Sales and Marketing Staff",
  "Security Staff",
  "Spa and Recreation Staff",
  "Valet and Bell Staff"
];

// Helper function to darken color
const darkenColor = (color, percent) => {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = f >> 16;
  const G = f >> 8 & 0x00FF;
  const B = f & 0x0000FF;
  return `#${(0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)}`;
};

const StaffDashboard = () => {
  const [staffData, setStaffData] = useState([]);
  const [staffCounts, setStaffCounts] = useState({});

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/staff/get-staff');
        setStaffData(response.data);
        const counts = response.data.reduce((acc, staff) => {
          acc.total = (acc.total || 0) + 1;
          acc[staff.position] = (acc[staff.position] || 0) + 1;
          return acc;
        }, {});
        setStaffCounts(counts);
      } catch (error) {
        console.error('There was an error fetching the staff data!', error);
      }
    };

    fetchStaffData();
  }, []);

  return (
    <DashboardContainer>
      <MainHeader/>
      <MainSection>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <MainContent>
          <CardWrapper>
            <Typography variant="h4" gutterBottom style={{ fontFamily: 'cursive', fontWeight: 'bold', color: 'purple', textAlign: 'center' }}>
              Staff Overview
            </Typography>
            <CardContainer>
              <FullWidthCard color="#FF7043"> 
                <IconWrapper>
                  <FaUsers size={40} />
                </IconWrapper>
                <Title>Total Staff</Title>
                <Count>{staffCounts.total || 0}</Count>
              </FullWidthCard>
              {positions.map((position, index) => (
                <Card key={position} color={colors[index % colors.length]}>
                  <IconWrapper>
                    {icons[position] || <FaClipboardList size={40} />} {/* Default icon if none found */}
                  </IconWrapper>
                  <Title>{position}</Title>
                  <Count>{staffCounts[position] || 0}</Count>
                </Card>
              ))}
            </CardContainer>
          </CardWrapper>
        </MainContent>
      </MainSection>
      <Footer/>
    </DashboardContainer>
  );
};

export default StaffDashboard;
