import React, { useState } from 'react';
import './style.css'
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에서 로그인 로직을 처리하거나 API 호출을 추가할 수 있습니다.
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="login-container">
      <div className="login-header">Login</div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>PASSWORD:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
