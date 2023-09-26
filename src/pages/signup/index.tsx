import React, { useState } from 'react';
import './style.css';
import Header from '../main/Header';

function App() {
  const [isIdTaken, setIsIdTaken] = useState(false);
  const [availableId, setAvailableId] = useState('');
  const [isCreateButtonEnabled, setIsCreateButtonEnabled] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true); // 패스워드가 비어있는지 여부

  const checkUsername = async () => {
    const id = (document.querySelector("input[name='id']") as HTMLInputElement)?.value;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/check_username/${id}`);
      const data = await response.json();

      setIsIdTaken(data.isTaken);
      if (!data.isTaken) {
        setAvailableId(id);
        setIsCreateButtonEnabled(true);
      } else {
        setIsCreateButtonEnabled(false);
      }
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };

  const handleCreateButtonClick = () => {
    // create 버튼을 클릭할 때 필요한 동작 수행
    // 예: 폼 제출
    // 예: 사용 가능한 아이디로 계정 생성
  };

  const checkPasswordMatch = () => {
    const password = (document.querySelector("input[name='password']") as HTMLInputElement)?.value;
    const confirm_password = (document.querySelector("input[name='confirm_password']") as HTMLInputElement)?.value;

    setPasswordsMatch(password === confirm_password);
    setIsPasswordEmpty(password === ''); // 패스워드가 비어있는지 여부 확인
  };

  const getPasswordInputClassName = () => {
    if (isPasswordEmpty) {
      return 'password-input'; // 패스워드가 비어 있을 때는 클래스만 반환
    } else if (passwordsMatch) {
      return 'password-input valid';
    } else {
      return 'password-input invalid';
    }
  };

  return (
    <div>
      <Header />
      <div className="create-container">
        <div className="create-form">
          <form action="http://127.0.0.1:5000/api/create/" method="POST">
            <p><input type="text" name="id" placeholder="id" /></p>
            <p><input type="password" name="password" placeholder="password" onChange={checkPasswordMatch} /></p>
            <p><input type="password" name="confirm_password" placeholder="confirm_password" onChange={checkPasswordMatch} className={getPasswordInputClassName()} /></p>
            <p><input type="text" name="name" placeholder="name" /></p>
            <p><input type="submit" value="create" disabled={!isCreateButtonEnabled || !passwordsMatch} onClick={handleCreateButtonClick} /></p>
          </form>
          
          <button onClick={checkUsername}>Check ID</button>

          {isIdTaken ? (
            <p>이미 사용 중인 아이디입니다.</p>
          ) : (
            <p>사용 가능한 아이디입니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
