import React from 'react';
import ReactDOM from 'react-dom/client'; // Notice the "/client" addition
import App from './App.jsx';
import './styles/app.css'; // Make sure this CSS file path actually exists

// Create the modern React 18 root element mounting bridge
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
