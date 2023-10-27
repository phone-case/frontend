// s1.tsx
import React from 'react';
import './s2.css';

const S2 = () => {
  return (
    <div className='s2-slider'>
      <video autoPlay muted loop className="slide-video">
        <source src="./videos/test.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default S2;
