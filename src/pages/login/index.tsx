import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../main/Header';
import './style.css';
import { useUser } from './../main/UserContext';

function Login() {
  const { setUserName } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        setUserName(data.name); // 사용자 이름 설정
        console.log('서버에서 받은 이름:', data.name);
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
