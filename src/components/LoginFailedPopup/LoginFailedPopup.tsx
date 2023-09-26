import React from 'react';

interface LoginFailedPopupProps {
  onClose: () => void; // onClose는 함수이며, 반환값이 없는 함수입니다.
}

function LoginFailedPopup({ onClose }: LoginFailedPopupProps) {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>로그인에 실패했습니다. 아이디 또는 비밀번호가 다릅니다.</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default LoginFailedPopup;
