import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage

  if (!token) {
    // Если токен отсутствует, перенаправляем на страницу логина
    return <Navigate to="/login" />;
  }

  return <>{children}</>; // Если есть токен, рендерим дочерние элементы (защищенную страницу)
};

export default ProtectedRoute;
