import { useState } from 'react';

function Header({ currentPage, setCurrentPage }) {
  const navStyle = {
    color: 'white',
    marginRight: '20px',
    cursor: 'pointer',
    textDecoration: 'none'
  };

  const activeStyle = {
    ...navStyle,
    textDecoration: 'underline',
  };

  return (
    <header style={{
      background: '#007bff',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      marginBottom: '20px'
    }}>
      <h1>Tatya Vinchu</h1>
      <nav style={{ marginTop: '10px' }}>
        <a href="#home" onClick={() => setCurrentPage('home')} style={currentPage === 'home' ? activeStyle : navStyle}>
          Home
        </a>
        <a href="#about" onClick={() => setCurrentPage('about')} style={currentPage === 'about' ? activeStyle : navStyle}>
          About
        </a>
        <a href="#contact" onClick={() => setCurrentPage('contact')} style={currentPage === 'contact' ? activeStyle : navStyle}>
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;