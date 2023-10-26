import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-left">
            </div>
            <div className="footer-right">
                <Link to="/" className="footer-logo">
                    RM<span className="footer-logo-highlight">CL</span>
                </Link>
            </div>
        </div>
    );
};

export default Footer;
