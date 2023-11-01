// s1.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './s2.module.css';

const S2 = () => {
  return (
    <div className={styles['s2-page']}>
      <div className={styles['s2-slider']}>
          <video autoPlay muted loop className={styles["slide-video"]}>
            <source src="./videos/test.mp4" type="video/mp4" />
          </video>
        <Link to="/create">
          <button className={styles['create-button']}>
            <span>사진 만들러가기</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default S2;
