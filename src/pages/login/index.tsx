import React, { useState } from 'react';
import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // e의 타입을 명시적으로 지정
    e.preventDefault();
    // 여기에서 로그인 로직을 처리하거나 API 호출을 추가할 수 있습니다.
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="login-container">
      <div className="login-text-container">
        <div className="login-text">Login</div>
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
            로그인 
          </button>
          <button type="button" className="register-button">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
        
export default Login;