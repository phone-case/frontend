import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from "./pages/main/index"
import Signup from './pages/signup/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Main />
    <Signup />
  </React.StrictMode>
);
