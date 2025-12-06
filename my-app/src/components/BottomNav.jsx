import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        <Link to="/" className="bottom-nav-link">Home</Link>
        <Link to="/books" className="bottom-nav-link">Bookshelf</Link>
        <Link to="/projects" className="bottom-nav-link">Projects</Link>
        <Link to="/athletics" className="bottom-nav-link">Athletics</Link>
        <Link to="/services" className="bottom-nav-link">Services</Link>
      </div>
    </nav>
  );
}

export default BottomNav;
