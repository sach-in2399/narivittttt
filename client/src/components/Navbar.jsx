import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">NARIVITT</Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="navbar-toggle" onClick={toggleMenu}>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}></div>
      </div>

      {/* Navbar Links */}
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/features" className="nav-link">Features</Link>
      </div>
    </nav>
  );
};

export default NavBar;
