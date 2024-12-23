import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Если хотите начать измерять производительность в приложении, передайте функцию
// для логирования результатов (например: reportWebVitals(console.log))
// или отправьте их на аналитический сервер. Узнайте больше: https://bit.ly/CRA-vitals
reportWebVitals();
