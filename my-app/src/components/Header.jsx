import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="header-outer">
      <Link to="/" className="header-logo-link">
        <div className="header-logo-placeholder">Audrey Goddard</div>
      </Link>
      <header className="top-nav split-nav">
        <nav className={`nav-center ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)} className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li><Link to="/books" onClick={() => setIsMenuOpen(false)} className={isActive('/books') ? 'active' : ''}>Bookshelf</Link></li>
            <li><Link to="/projects" onClick={() => setIsMenuOpen(false)} className={isActive('/projects') ? 'active' : ''}>Projects</Link></li>
          </ul>
        </nav>
        <nav className="nav-right">
          <ul>
            <li>
              <a href="https://linkedin.com/in/audrey-goddard" className="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/audrey_goddard/" className="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="https://x.com/aletheia_444" className="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>X</span>
              </a>
            </li>
          </ul>
          <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </header>
    </div>
  );
}

export default Header;
