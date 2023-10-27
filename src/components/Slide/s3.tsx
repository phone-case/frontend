// s1.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import'./s3.css'

const S3 = () => {
  return (
    <div className="slide-content">
      <div className="slide-image"/>
      <video autoPlay muted loop className="slide-video">
        <source src="./videos/test2.mp4" type="video/mp4" />
      </video>
        <Link to="/create">
              <button className='create-button'>
                create
              </button>
        </Link>
    </div>
  );
};

export default S3;
