/**
 * Footer.jsx
 *
 * Site-wide footer rendered by the portfolio layout.
 * Contains a contact email and social media links.
 */

import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';
import site from '@/data/siteConfig';

// Map each siteConfig.sameAs URL to its icon.
// Order matches siteConfig: LinkedIn, Instagram, X, Substack.
const SOCIAL_ICONS = [
  { href: site.sameAs[0], label: 'LinkedIn',   icon: <FaLinkedin /> },
  { href: site.sameAs[1], label: 'Instagram',  icon: <FaInstagram /> },
  { href: site.sameAs[2], label: 'X (Twitter)', icon: <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>X</span> },
  { href: site.sameAs[3], label: 'Substack',   icon: <SiSubstack /> },
];

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

        <div className="footer-section footer-connect">
          <div className="footer-social">
            {SOCIAL_ICONS.map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
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
