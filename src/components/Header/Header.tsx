import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css'; // styles로 스타일을 가져옵니다.
import { useUser } from '../UserContext/UserContext';

const Header = () => {
  const { userName, logout } = useUser();

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
  };

  return (
    <div className={styles.header}> {/* styles.header로 클래스를 참조합니다. */}
      <div className={styles['black-nav']}> {/* 클래스 이름에 하이픈(-)이 있는 경우 []로 감싸주어야 합니다. */}
        <div className={styles.logo}><Link to="/">폰껍</Link></div>
        <div className={styles['login-button']}>
          {userName ? (
            <div>
              {userName} <a href='#' onClick={handleLogout}>로그아웃</a>
            </div>
          ) : (
            <Link to="/login">
              <img src="./img/loginicon.png" alt="Login" style={{ width: '50px', height: '50px' }} /> {/* 이미지 크기 조절 */}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
