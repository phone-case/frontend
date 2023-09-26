import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <div className="header">
      <div className="black-nav">
        <div className="logo">
          <Link to="/">폰껍</Link> 
        </div>
        <div id="login-button">
          <Link to="/login">
          <img src="./img/loginicon.png" alt="Login" style={{ width: '50px', height: '50px' }} /> {/* 이미지 크기 조절 */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
