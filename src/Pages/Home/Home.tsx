import React from 'react';
import './Home.css'; // Подключаем CSS для стилей

const Home = () => (
  <div className="home-container">
    <div className="text-content">
      <h2>Welcome to the Flower Shop</h2>
       <p>Explore our collection of flowers</p>
    </div>
    <div className="image-content" aria-hidden="true"></div>
  </div>
);

export default Home;
