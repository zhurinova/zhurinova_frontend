import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'; // Импортируем стили

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Удаляем токен из localStorage
    localStorage.removeItem('token');
    
    // Перенаправляем на страницу входа
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
