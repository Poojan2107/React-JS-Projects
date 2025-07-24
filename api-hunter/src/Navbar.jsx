import React from 'react';
import './Navbar.css';

const Navbar = ({ page, setPage }) => (
  <nav className="navbar">
    <div className="navbar-title">Navbar</div>
    <div className="navbar-links">
      <button
        className={`navbar-link${page === 'add' ? ' active' : ''}`}
        onClick={() => setPage('add')}
      >
        Add Product
      </button>
      <button
        className={`navbar-link${page === 'view' ? ' active' : ''}`}
        onClick={() => setPage('view')}
      >
        View Product
      </button>
    </div>
  </nav>
);

export default Navbar;
