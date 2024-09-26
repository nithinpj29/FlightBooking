import React from 'react';
import './Header.css'
import headerImage from "./header.jpg"

const Header: React.FC = () => {
  return (
    <div className="header-container">
    <header className="header-content">
      <h1 className="header-title">
        <span className="header-part1">Find And Book</span>
        <br />
        <br />
        <span className="header-part2">A Great Experience</span>
      </h1>
      <img className="header-image" src={headerImage} alt="header" />
    </header>
  </div>
  );
};

export default Header;
