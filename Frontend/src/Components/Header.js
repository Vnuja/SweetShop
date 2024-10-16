import React from "react";
import '../styles/Header.css';
// import logo from '../images/logo.png'; 

const Header = () => {
  return (
    <div>
      <nav>
        <div className="wrapper">
          <div className="logo">
            {/* <img src={logo} className="logocus" alt="Melody of Treatz Logo" />   */}
            <a href="/" aria-label="Home">Melody of Treatz</a>
          </div>
          <input type="radio" name="slider" id="menu-btn" />
          <input type="radio" name="slider" id="close-btn" />
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn" aria-label="Close menu">
              <i className="fas fa-times"></i>
            </label>
            <li><a href="/home" aria-label="Home">Home</a></li>
            <li><a href="/menu" aria-label="Menu">Menu</a></li>
            <li><a href="/policy" aria-label="Policy">Policy</a></li>
            <li><a href="/support" aria-label="Support & Help">Support & Help</a></li>
            <li><a href="/feedback" aria-label="Feedback">Support & Help</a></li>
          </ul>
          <label htmlFor="menu-btn" className="btn menu-btn" aria-label="Open menu">
            <i className="fas fa-bars"></i>
          </label>
        </div>
      </nav>
    </div>
  );
};

export default Header;
