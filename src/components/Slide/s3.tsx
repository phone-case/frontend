// s1.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const S3 = () => {
  return (
    <div className="slide-content">
      {/* 슬라이드 내용 */}
      <img src="./img/phone3.PNG" alt="Slide 3" className="slide-image"/>

        <Link to="/create">
              <button className='create-button'>
                create
              </button>
        </Link>
    </div>
  );
};

export default S3;
