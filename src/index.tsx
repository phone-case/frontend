import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/main/index';
import ImageSlider from './pages/main'; // ImageSlider 컴포넌트를 import

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ImageSlider />
  </React.StrictMode>
);
