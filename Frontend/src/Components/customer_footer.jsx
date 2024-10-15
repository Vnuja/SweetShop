import React from 'react';
import './customer_footer.css'; // Importing the CSS file

function CustomerFooter() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* About Section */}
                <div className="footer-section">
                    <h3 className="footer-title">About Us</h3>
                    <p style={{marginRight:'80px'}}>We provide delicious sweets at your door. we guarantee that our sweets are the best sweets you can buy...</p>
                </div>

                {/* Quick Links Section */}
                <div className="footer-section">
                    <h3 className="footer-title">Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="/bookings">Home</a></li>
                        <li><a href="/facilities">Services</a></li>
                        <li><a href="/transportation">About Us</a></li>
                        <li><a href="/reviews">Contact Us</a></li>
                    </ul>
                </div>

                {/* Contact & Social Media */}
                <div className="footer-section">
                    <h3 className="footer-title">Contact Us</h3>
                    <p>Email: candysweetd@gmail.com</p>
                    <p>Phone: +94-51-2242863</p>

                    {/* Social Media Links */}
                    <div className="footer-social">
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Candy Sweets Org. All Rights Reserved.
            </div>
        </footer>
    );
}

export default CustomerFooter;
