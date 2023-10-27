// s1.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './s2.css';

const S2 = () => {
  return (
    <div className="slide-content">
      <div className="slide-image"/>
        <video autoPlay muted loop className="slide-video">
          <source src="./videos/test.mp4" type="video/mp4" />
        </video>
      <Link to="/create">
        <button className='create-button'>
          <span>사진 만들러가기</span>
        </button>
      </Link>
    </div>
  );
};

export default S2;
