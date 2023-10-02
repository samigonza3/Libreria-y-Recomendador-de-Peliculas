import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Presentación básica de la app
const Presentation = () => {
  return (
    <div className="presentation">
      <h1>MuviLibrary.com</h1>
      <p>Guarda las películas que ves y obtén recomendaciones</p>
    </div>
  ); 
};

// Renderizado de la aplicación
root.render(
  <React.StrictMode>
    <Presentation />
    <App />
  </React.StrictMode>
);


