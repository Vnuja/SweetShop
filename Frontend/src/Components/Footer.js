import React from 'react';
import '../styles/Footer.css';
import 'font-awesome/css/font-awesome.min.css';

const Footer1 = () => {
    return (
        <div>
            <footer className="footer-distributed">
                <div className="footer-left">
                    <h3>Company<span>logo</span></h3>
                    <p className="footer-links">
                        <a href="/">Home</a>
                        <a href="/">Menu</a>
                        <a href="/">Policy</a>
                        <a href="/">Support & Help</a>
                    </p>
                    <p className="footer-company-name">Melody of Treatz © 2015</p>
                </div>

                <div className="footer-center">
                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p><span>Panchikawatta Road</span> Malabe</p>
                    </div>

                    <div>
                        <i className="fa fa-phone"></i>
                        <p>072 778 2877</p>
                    </div>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p><a href="mailto:support@company.com">sweetshop@gmail.com</a></p>
                    </div>
                </div>

                <div className="footer-right">
                    <p className="footer-company-about">
                        <span>About the company</span>
                        Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
                    </p>

                  
                </div>
            </footer>
        </div>
    );
};

export default Footer;
