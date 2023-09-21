import React, { useState } from 'react';

// 데이터의 타입 정의
interface DataItem {
  id: number;
  name: string;
  role: string;
}

function App() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string | null>(null); // 이름은 문자열 또는 null

  const handleSubmit = () => {
    // 아이디와 비밀번호를 Flask API로 전송
    fetch(`/api/get_name?id=${id}&password=${password}`)
      .then((response) => response.json())
      .then((data: { name: string }) => {
        if (data.name) {
          setName(data.name);
        } else {
          setName('사용자를 찾을 수 없습니다.');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>이름 조회</h1>
      <div>
        <label htmlFor="id">아이디:</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>조회</button>
      <div>
        <p>이름: {name !== null ? name : '조회 결과가 없습니다.'}</p>
      </div>
    </div>
  );
}

export default App;
