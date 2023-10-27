// s1.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './s2.module.css';

const S3 = () => {
  return (
    <div className={styles["slide-content"]}>
      <video autoPlay muted loop className={styles["slide-video"]}>
        <source src="./videos/test2.mp4" type="video/mp4" />
      </video>
        <Link to="/create">
              <button className={styles['create-button']}>
                <span>디자인 하러가기</span>
              </button>
        </Link>
    </div>
  );
};

export default S3;
