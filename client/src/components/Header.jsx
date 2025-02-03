import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">NARIVITT</Link>
      </div>
      <nav className="nav-links">
        <Link to="/financial-education">Financial Education</Link>
        <Link to="/budgeting">Budgeting</Link>
        <Link to="/micro-investments">Micro-Investments</Link>
        <Link to="/inventory-management">Inventory Management</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/community-learning">Community Learning</Link>
        <Link to="/banking">Banking</Link>
      </nav>
    </header>
  );
};

export default Header;