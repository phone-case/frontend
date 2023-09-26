// App.tsx
import React, { useState } from 'react';
import './style.css';
import Header from '../main/Header';

function App() {
  // 중복 여부를 저장하는 상태 변수
  const [isIdTaken, setIsIdTaken] = useState(false);
  // 사용 가능한 아이디를 저장하는 상태 변수
  const [availableId, setAvailableId] = useState('');
  // create 버튼 활성화 여부를 저장하는 상태 변수
  const [isCreateButtonEnabled, setIsCreateButtonEnabled] = useState(false);

  // 아이디 중복 확인 함수
  const checkUsername = async () => {
    const id = (document.querySelector("input[name='id']") as HTMLInputElement)?.value; // id 입력값 가져오기

    // Flask API를 호출하여 중복 아이디 확인
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/check_username/${id}`);
      const data = await response.json();

      // API에서 받은 결과를 기반으로 상태 업데이트
      setIsIdTaken(data.isTaken);
      if (!data.isTaken) {
        setAvailableId(id);
        setIsCreateButtonEnabled(true); // 중복이 없으면 create 버튼 활성화
      } else {
        setIsCreateButtonEnabled(false); // 중복이 있으면 create 버튼 비활성화
      }
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };

  // create 버튼 클릭 핸들러
  const handleCreateButtonClick = () => {
    // create 버튼을 클릭할 때 필요한 동작 수행
    // 예: 폼 제출
    // 예: 사용 가능한 아이디로 계정 생성
  };

  return (
    <div>
      <Header />
      <div className="create-container">
        <div className="create-form">
          <form action="http://127.0.0.1:5000/api/create/" method="POST">
            <p><input type="text" name="id" placeholder="id" /></p>
            <p><input type="password" name="password" placeholder="password" /></p>
            <p><input type="confirm_password" name="confirm_password" placeholder="confirm_password" /></p>
            <p><input type="text" name="name" placeholder="name" /></p>
            <p><input type="submit" value="create" disabled={!isCreateButtonEnabled} onClick={handleCreateButtonClick} /></p>
          </form>
          
          {/* 중복 아이디 확인 버튼 */}
          <button onClick={checkUsername}>Check ID</button>

          {/* 중복 여부에 따른 메시지 표시 */}
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
