import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from './Components/Header/Header.tsx';
import Footer from './Components/Footer/Footer.tsx';
import Menu from './Components/Menu/Menu.tsx';
import Home from './Pages/Home/Home.tsx';
import Orders from './Pages/Orders/Orders.tsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.tsx';
import Customers from './Pages/Customer/Customer.tsx';
import Login from './Pages/Login/Login.tsx';

const App = () => (
  <Router>
    <Header />
    <Menu />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                  <Orders />
              </ProtectedRoute>
            }
        />
          <Route
            path="/customers"
            element={
           <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;