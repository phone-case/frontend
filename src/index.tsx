import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from "./pages/login/index"
import Signup from './pages/signup/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Login />
    <Signup />
  </React.StrictMode>
);
