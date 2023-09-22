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
const view =  window.innerWidth 

root.render(
  <React.StrictMode>
    <BrowserRouter>
    { view  > 400 ? 
    <>
    {isAuthenticated ? <App /> : <Login />} </> : 
    <div className='bg-black text-white text-center py-20'><h2 className='text-xl'>No dey whine me Boss!! <br/> change to desktop view</h2></div>
    }
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
