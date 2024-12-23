import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from './Components/Header/Header.tsx';
import Footer from './Components/Footer/Footer.tsx';
import Menu from './Components/Menu/Menu.tsx';
import Home from './Pages/Home/Home.tsx';
import Exhibits from './Pages/Exhibits/Exhibits.tsx';
import Login from './Pages/Login/Login.tsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.tsx';
import Artists from './Pages/Artists/Artists.tsx';

const App = () => (
  <Router>
    <Header />
    <Menu />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Используем ProtectedRoute для защиты маршрута */}
        <Route
          path="/exhibits"
          element={
           <ProtectedRoute>
              <Exhibits />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artists"
          element={
           <ProtectedRoute>
              <Artists />
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

// const App = () => (
//   <Router>
//     <Header />
//     <Menu />
//     <main>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* Используем ProtectedRoute для защиты маршрута */}
//         <ProtectedRoute path="/exhibits" element={<Exhibits />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </main>
//     <Footer />
//   </Router>
// );
//export default App;

// const App = () => (
//   <Router>
//     <Header />
//     <Menu />
//     <main>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/exhibits" element={<Exhibits />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </main>
//     <Footer />
//   </Router>
// );

// export default App;
