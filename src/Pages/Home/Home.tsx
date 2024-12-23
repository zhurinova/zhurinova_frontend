import React from 'react';
import './Home.css'; // Подключаем CSS для стилей

const Home = () => (
  <div className="home-container">
    <div className="text-content">
      <h2>Welcome to the Art Gallery</h2>
      <p>Explore our collection of masterpieces</p>
    </div>
    <div className="image-content" aria-hidden="true"></div>
  </div>
);

export default Home;
