import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate로 변경
import Header from './../main/Header';
import './style.css';
import { useUser } from './../main/UserContext';

function Login() {
  const { setUserName } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate(); // useNavigate 사용

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 로그인 로직 및 서버 요청 수행

      // 로그인 성공 시 사용자 이름 설정
      const response = await fetch('/api/get_name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.name === null) {
          console.log('아이디 또는 비밀번호가 다릅니다.');
        } else {
          setUserName(data.name);
          console.log('서버에서 받은 이름:', data.name);
          setLoggedIn(true);
          navigate('/'); // 로그인 성공 시 메인 페이지로 이동
        }
      } else {
        console.error('서버 응답 오류');
      }
    } catch (error) {
      console.error('요청 실패:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="login-text-container">
          <div className="line"></div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ID"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="button-container">
            <button type="submit" className="login-button">
              login
            </button>
            <Link to="/signup">
              <button type="button" className="register-button">
                signup
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
