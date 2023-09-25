import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <div className="header">
      <div className="black-nav">
        <div className="logo">
          <Link to="/">폰껍</Link> {/* 메인 페이지로 이동하는 Link */}
        </div>
        <div id="login-button">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
