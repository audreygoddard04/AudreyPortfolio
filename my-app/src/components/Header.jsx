'use client';

/**
 * Header.jsx
 *
 * Site-wide navigation bar rendered by the portfolio layout.
 * Displays the logo/name link on the left, main nav in the center,
 * and social icons + hamburger menu on the right.
 *
 * Accessibility notes:
 *  - The nav has an aria-label and an id so the hamburger button can
 *    reference it via aria-controls.
 *  - Pressing Escape while the menu is open closes it and returns focus
 *    to the hamburger button.
 *  - Clicking outside the menu also closes it.
 */

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaLinkedin, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';
import site from '@/data/siteConfig';

// ---------------------------------------------------------------------------
// Static data — defined outside the component so they're not re-created each render
// ---------------------------------------------------------------------------

/** Main navigation links shown in the center of the header */
const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About Me' },
  { href: '/projects', label: 'Projects' },
  { href: '/books',    label: 'Bookshelf' },
];

/**
 * Social icon definitions. Each entry maps a URL from siteConfig.sameAs
 * to the icon component that should render for it.
 */
const SOCIAL_ICONS = [
  {
    href: site.sameAs[0], // LinkedIn
    label: 'LinkedIn',
    icon: <FaLinkedin />,
  },
  {
    href: site.sameAs[1], // Instagram
    label: 'Instagram',
    icon: <FaInstagram />,
  },
  {
    href: site.sameAs[2], // X (Twitter)
    label: 'X (Twitter)',
    icon: <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>X</span>,
  },
  {
    href: site.sameAs[3], // Substack
    label: 'Substack',
    icon: <SiSubstack />,
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function Header() {
  // --- State ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Refs used to detect clicks outside the open menu
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // --- Helpers ---

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu  = () => setIsMenuOpen(false);

  /**
   * Returns true when the current path matches a nav link's href.
   * The home route ('/') is an exact match; all others use startsWith so
   * nested routes (e.g. /articles/my-post) keep the Articles link active.
   */
  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // --- Effects ---

  // Close the menu when the user clicks outside it or presses Escape
  useEffect(() => {
    if (!isMenuOpen) return; // no listeners needed when menu is already closed

    const handleClickOutside = (e) => {
      const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(e.target);
      const clickedOutsideHamburger = hamburgerRef.current && !hamburgerRef.current.contains(e.target);
      if (clickedOutsideMenu && clickedOutsideHamburger) closeMenu();
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        hamburgerRef.current?.focus(); // return focus to the trigger button
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    // Cleanup listeners when menu closes or component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  // --- Render ---

  return (
    <div className="header-outer">
      {/* Logo / site name — always links back to home */}
      <Link href="/" className="header-logo-link">
        <div className="header-logo-placeholder">Audrey Goddard</div>
      </Link>

      <header className="top-nav split-nav">
        {/* Center: main navigation links */}
        <nav
          id="portfolio-navigation"
          aria-label="Main navigation"
          ref={menuRef}
          className={`nav-center ${isMenuOpen ? 'nav-open' : ''}`}
        >
          <ul>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={closeMenu} className={isActive(href) ? 'active' : ''}>
                  {label}
                </Link>
              </li>
            ))}
            {/* KELTNER uses a plain <a> because it's a separate publication sub-site */}
            <li><a href="/keltner" onClick={closeMenu}>KELTNER</a></li>
          </ul>
        </nav>

        {/* Right: social icons + hamburger (mobile) */}
        <nav className="nav-right" aria-label="Social links">
          <ul>
            {SOCIAL_ICONS.map(({ href, label, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="social-icon-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>

          <button
            ref={hamburgerRef}
            className="hamburger-menu"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="portfolio-navigation"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </header>
    </div>
  );
}

export default Header;
