import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact</h3>
          <p>
            <a href="mailto:audreyannagoddard@gmail.com">audreyannagoddard@gmail.com</a>
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="footer-social">
            <a href="https://linkedin.com/in/audrey-goddard" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/audrey_goddard/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://x.com/aletheia_444" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>X</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Audrey Goddard. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

