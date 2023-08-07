import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import Login from './pages/login';

const root = ReactDOM.createRoot(document.getElementById('root'));

// handling the admin authentication here
// function would be used to determine admin authentication if true or false
const isAuthenticated = true;

root.render(
  <React.StrictMode>
    <BrowserRouter>
    {isAuthenticated ? <App /> : <Login />}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
