import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen) {
        // Check if click is outside the menu and hamburger button
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target) &&
          hamburgerRef.current &&
          !hamburgerRef.current.contains(event.target)
        ) {
          closeMenu();
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="header-outer">
      <Link to="/" className="header-logo-link">
        <div className="header-logo-placeholder">Audrey Goddard</div>
      </Link>
      <header className="top-nav split-nav">
        <nav ref={menuRef} className={`nav-center ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={closeMenu} className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li><Link to="/books" onClick={closeMenu} className={isActive('/books') ? 'active' : ''}>Bookshelf</Link></li>
            <li><Link to="/projects" onClick={closeMenu} className={isActive('/projects') ? 'active' : ''}>Projects</Link></li>
            <li><Link to="/athletics" onClick={closeMenu} className={isActive('/athletics') ? 'active' : ''}>Athletics</Link></li>
            <li><Link to="/services" onClick={closeMenu} className={isActive('/services') ? 'active' : ''}>Services</Link></li>
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
              <a href="https://x.com/audreygoddard_" className="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>X</span>
              </a>
            </li>
          </ul>
          <button ref={hamburgerRef} className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </header>
    </div>
  );
}

export default Header;
