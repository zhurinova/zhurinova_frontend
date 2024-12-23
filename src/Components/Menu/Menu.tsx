import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Подключаем стили для меню
import LogoutButton from './Logout.tsx'; // Импортируем компонент для кнопки выхода

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия меню

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Меняем состояние при клике на кнопку
  };

  return (
    <div>
      {/* Кнопка для открытия/закрытия меню */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Боковое меню */}
      <nav className={`side-menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/exhibits" onClick={toggleMenu}>Exhibits</Link>
          </li>
          <li>
            <Link to="/artists" onClick={toggleMenu}>Artists</Link>
          </li>
          <li>
            <Link to="/login" onClick={toggleMenu}>Login</Link>
          </li>
          {/* Кнопка Logout, которая будет отображаться в меню */}
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
