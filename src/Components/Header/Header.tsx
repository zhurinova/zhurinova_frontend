import React from 'react'; 
//import LogoutButton from '../Menu/Logout.tsx'; 
import './Header.css'; // Импортируем стили для компонента Header

const Header = () => (
  <header className="header-container">
    <div className="text-container">
      <h1>Art Gallery</h1>
    </div>
    <div className="image-container">
      <img 
        src="https://svgsilh.com/svg_v2/2027123.svg" 
        alt="Logo" 
        className="logo" 
      />
    </div>
  </header>
);

export default Header;
