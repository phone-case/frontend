import React, { useState } from 'react';
import './style.css';
import Header from '../../components/Header/Header';

function App() {
  const [isIdTaken, setIsIdTaken] = useState<boolean | null>(null);
  const [availableId, setAvailableId] = useState<string>('');
  const [isCreateButtonEnabled, setIsCreateButtonEnabled] = useState<boolean>(false);
  const [isIdFieldEditable, setIsIdFieldEditable] = useState<boolean>(true);

  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean>(true);

  const [name, setName] = useState<string>('');

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
        setIsCreateButtonEnabled(!isPasswordEmpty && passwordsMatch && !!name && !isIdTaken); // Enable if password, name, and ID are valid
        setIsIdFieldEditable(false);
      } else {
        setIsCreateButtonEnabled(false);
        setIsIdFieldEditable(true);
      }
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };

  const handleCreateButtonClick = () => {
    alert('회원가입 되셨습니다.');
  };

  const checkPasswordMatch = () => {
    const password = (document.querySelector("input[name='password']") as HTMLInputElement)?.value;
    const confirm_password = (document.querySelector("input[name='confirm_password']") as HTMLInputElement)?.value;

    setPasswordsMatch(password === confirm_password);
    setIsPasswordEmpty(password === '');

    setIsCreateButtonEnabled(!isPasswordEmpty && passwordsMatch && !!name && !isIdTaken);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);

    setIsCreateButtonEnabled(!isPasswordEmpty && passwordsMatch && !!newName && !isIdTaken);
  };

  const getPasswordInputClassName = (): string => {
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
                readOnly={!isIdFieldEditable}
              />
            </p>
            <p><input type="password" name="password" placeholder="password" onChange={checkPasswordMatch} /></p>
            <p><input type="password" name="confirm_password" placeholder="confirm_password" onChange={checkPasswordMatch} className={getPasswordInputClassName()} /></p>
            <p><input type="text" name="name" placeholder="name" value={name} onChange={handleNameChange} /></p>
            <p><input type="submit" value="create" disabled={!isCreateButtonEnabled} onClick={handleCreateButtonClick} /></p>

            
          </form>
          <div className="check-form">
            <button onClick={checkUsername}>Check ID</button>

            {isIdTaken === true && <p>이미 사용 중인 아이디입니다.</p>}
            {isIdTaken === false && <p>사용 가능한 아이디입니다.</p>}
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
