import React, { useState } from 'react';
import './style.css';
import Header from '../../components/Header/Header';

function App() {
  const [isIdTaken, setIsIdTaken] = useState(null);
  const [availableId, setAvailableId] = useState('');
  const [isCreateButtonEnabled, setIsCreateButtonEnabled] = useState(false);
  const [isIdFieldEditable, setIsIdFieldEditable] = useState(true); // Track the editability of the "id" field

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);

  const checkUsername = async () => {
    const idInput = document.querySelector("input[name='id']") as HTMLInputElement;
    const id = idInput?.value;

    if (!id) {
      setIsIdTaken(null);
      setIsCreateButtonEnabled(false);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/check_username/${id}`);
      const data = await response.json();

      setIsIdTaken(data.isTaken);
      if (!data.isTaken) {
        setAvailableId(id);
        setIsCreateButtonEnabled(true);
        setIsIdFieldEditable(false); // Disable the "id" field for editing
      } else {
        setIsCreateButtonEnabled(false);
        setIsIdFieldEditable(true); // Enable the "id" field for editing if the ID is already taken
      }
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };

  const handleCreateButtonClick = () => {
    // create 버튼을 클릭할 때 필요한 동작 수행
    // 예: 폼 제출
    // 예: 사용 가능한 아이디로 계정 생성
    alert('회원가입 되셨습니다.');
  };

  const checkPasswordMatch = () => {
    const password = (document.querySelector("input[name='password']") as HTMLInputElement)?.value;
    const confirm_password = (document.querySelector("input[name='confirm_password']") as HTMLInputElement)?.value;

    setPasswordsMatch(password === confirm_password);
    setIsPasswordEmpty(password === '');
  };

  const getPasswordInputClassName = () => {
    if (isPasswordEmpty) {
      return 'password-input';
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
            <p>
              <input
                type="text"
                name="id"
                placeholder="id"
                readOnly={!isIdFieldEditable} // Use readOnly attribute
              />
            </p>
            <p><input type="password" name="password" placeholder="password" onChange={checkPasswordMatch} /></p>
            <p><input type="password" name="confirm_password" placeholder="confirm_password" onChange={checkPasswordMatch} className={getPasswordInputClassName()} /></p>
            <p><input type="text" name="name" placeholder="name" /></p>
            <p><input type="submit" value="create" disabled={!isCreateButtonEnabled || !passwordsMatch} onClick={handleCreateButtonClick} /></p>
          </form>
          
          <button onClick={checkUsername}>Check ID</button>

          {isIdTaken === true && <p>이미 사용 중인 아이디입니다.</p>}
          {isIdTaken === false && <p>사용 가능한 아이디입니다.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
