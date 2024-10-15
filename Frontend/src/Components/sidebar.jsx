import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTachometerAlt, FaUsers, FaPlusSquare, FaChartBar, FaSignOutAlt, FaHome, FaCaretDown, FaCaretUp, FaFileAlt, FaClipboardList } from 'react-icons/fa'; // Added icons
import logo from '../Images/candy.png';

const SidebarContainer = styled.div`
  position: relative;
  width: 220px;
  height: 200vh;
  background-image: url('https://www.sweets4me.co.uk/cdn/shop/collections/traditionalloose_0203cf46-429a-4e70-81ef-f2aa5bd6ec8a.jpg?v=1634897951&width=1080');
  background-size: cover;
  background-position: center;
  padding: 20px;
  flex-direction: column;
  color: #ecf0f1;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 10px;
`;

const Menu = styled.div`
  flex-grow: 1;
`;

const MenuSectionTitle = styled.h4`
  margin: 20px 0 0 0;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 20px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #34495e;
    color: #fff;
  }
`;

const Icon = styled.div`
  margin-right: 15px;
  font-size: 20px;
`;

const ExpandableMenu = styled.div`
  padding-left: 20px;
  margin-bottom: 40px;
`;

const Sidebar = () => {
  const [isStaffMenuOpen, setStaffMenuOpen] = useState(true);

  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Hotel Logo" />
      </LogoContainer>

      {/* Staff Management Section */}
      <Menu>
        <MenuSectionTitle onClick={() => setStaffMenuOpen(!isStaffMenuOpen)}>
          Supplier Management 
        </MenuSectionTitle>
        {isStaffMenuOpen && (
          <ExpandableMenu>
            <Link to="/admin/supplier-dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaChartBar /></Icon>
                Supplier Dashboard
              </MenuItem>
            </Link>
            <Link to="/admin/add-supplier" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaUsers /></Icon>
                Add Supplier
              </MenuItem>
            </Link>
            <Link to="/admin/view-supplier" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaUsers /></Icon>
                View Supplier
              </MenuItem>
            </Link>
            <Link to="/admin/supplier-report" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaChartBar /></Icon>
                Supplier Report
              </MenuItem>
            </Link>
          </ExpandableMenu>
        )}
      </Menu>

      {/* Home and Sign Out */}
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem>
          <Icon><FaHome /></Icon>
          Home
        </MenuItem>
      </Link>
      <Link to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem>
          <Icon><FaSignOutAlt /></Icon>
          Sign Out
        </MenuItem>
      </Link>
    </SidebarContainer>
  );
};

export default Sidebar;
