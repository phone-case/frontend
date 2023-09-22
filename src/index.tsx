import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from "./pages/login/index"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);
