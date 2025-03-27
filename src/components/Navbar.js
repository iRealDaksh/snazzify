import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleOrdersClick = () => {
    console.log("Orders button clicked");
    window.location.href = '/orders'; // Update this URL to the orders page
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">SnazzTrack</Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/collection">Collection</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/maintenance">Maintenance</Link></li>
        <li>
          <button className="navbar-button" onClick={handleOrdersClick}>Orders</button>
        </li>
      </ul>
      <button className="navbar-button" onClick={() => navigate('/cart')}>Cart</button>
    </nav>
  );
}

export default Navbar; 