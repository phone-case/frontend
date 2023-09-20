import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

);
setInterval(function(){
  ('#slide2>ul').delay(10);
  ('#slide2>ul').animate({marginTop: "-300px"})
  ('#slide2>ul').delay(10);
  ('#slide2>ul').animate({marginTop: "-600px"})
  ('#slide2>ul').delay(10);
  ('#slide2>ul').animate({marginTop: "0px"})
});

reportWebVitals();

