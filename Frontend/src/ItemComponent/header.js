import React from 'react';
import './header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="https://cdn.vectorstock.com/i/500p/78/06/sweets-shop-logo-with-cupcake-image-vector-36027806.jpg" alt="Melody of Treatz" />
        <h1>Melody of Treatz</h1>
      </div>

      <nav className="header__nav">
        <a href="/home">Home</a>
        <a href="/menu">Menu</a>
        <a href="/itemrepoart">Product Dashboard</a>  
        <a href="/itemdetails">Product Details</a>       
        <a href="/policy">Policy</a>
        <a href="/support">Support & Help</a>
      </nav>

      <div className="header__search">
        <input type="text" placeholder="Search" />
        <button type="submit">Search</button>
      </div>

      <div className="header__profile">
        <img src="https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg" alt="User Profile" />
      </div>
    </header>
  );
};

export default Header;