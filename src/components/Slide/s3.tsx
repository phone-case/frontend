// s1.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import'./s3.css'

const S3 = () => {
  return (
    <div className="slide-content">
      {/* 슬라이드 내용 */}
      <img src="./img/phone3.PNG" alt="Slide 3" className="slide-image"/>
      <Link to="/design">
        <button className='create-button'>
          <span>디자인 하러가기</span>
        </button>
      </Link>
    </div>
  );
};

export default S3;
