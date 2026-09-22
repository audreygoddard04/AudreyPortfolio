'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaLinkedin, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
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
      return pathname === '/';
    }
    return pathname.startsWith(path);
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

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        hamburgerRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <div className="header-outer">
      <Link href="/" className="header-logo-link">
        <div className="header-logo-placeholder">Audrey Goddard</div>
      </Link>
      <header className="top-nav split-nav">
        <nav id="portfolio-navigation" aria-label="Main navigation" ref={menuRef} className={`nav-center ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><Link href="/" onClick={closeMenu} className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li><Link href="/about" onClick={closeMenu} className={isActive('/about') ? 'active' : ''}>About Me</Link></li>
            <li><Link href="/articles" onClick={closeMenu} className={isActive('/articles') ? 'active' : ''}>Articles</Link></li>
            <li><a href="/keltner" onClick={closeMenu}>KELTNER</a></li>
            <li><Link href="/projects" onClick={closeMenu} className={isActive('/projects') ? 'active' : ''}>Projects</Link></li>
            <li><Link href="/books" onClick={closeMenu} className={isActive('/books') ? 'active' : ''}>Bookshelf</Link></li>
            {/* <li><Link href="/website-design" onClick={closeMenu} className={isActive('/website-design') ? 'active' : ''}>Website Design</Link></li> */}
          </ul>
        </nav>
        <nav className="nav-right" aria-label="Social links">
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
            <li>
              <a href="https://audreyannagoddard.substack.com/" className="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="Substack">
                <SiSubstack />
              </a>
            </li>
          </ul>
          <button ref={hamburgerRef} className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen} aria-controls="portfolio-navigation">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </header>
    </div>
  );
}

export default Header;
