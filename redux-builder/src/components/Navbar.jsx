import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ background: 'linear-gradient(90deg, #2b5876 0%, #4e4376 100%)', padding: '0.7rem 0', boxShadow: '0 2px 8px #0002' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
      <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: 1 }}>Navbar</div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/add" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>Add Task</Link>
        <Link to="/view" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>View Task</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
