import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { useUser } from './UserContext';

const Header = () => {
  const { userName, logout } = useUser();

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
  };

  return (
    <div className="header">
      <div className="black-nav">
        <div className="logo"><Link to="/">폰껍</Link></div>
        <div id="login-button">
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
