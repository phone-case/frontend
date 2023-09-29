// s1.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const S3 = () => {
  return (
    <div>
      {/* 슬라이드 내용 */}
      <img src="./img/phone3.PNG" alt="Slide 3" className="slide-image"/>
      <h2>Slide 3</h2>
      <p>This is Slide 3 content.</p>
      <Link to="/create">
            <button>
              create
            </button>
      </Link>
    </div>
  );
};

export default S3;
