import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About NARIVITT</h3>
          <p>Empowering rural women with AI-driven financial tools and resources.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@narivitt.com</p>
          <p>Phone: +91 12345 67890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 NARIVITT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;