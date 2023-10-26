import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  userName: null,
  setUserName: () => {},
  logout: () => {},
});


export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // 페이지 로딩 시 로컬 스토리지에서 사용자 이름 복원
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const logout = () => {
    // 로그아웃 로직을 추가: 사용자 이름을 null로 설정
    setUserName(null);
    // 로그아웃 시 로컬 스토리지에서 해당 정보를 제거
    localStorage.removeItem('userName');
  };

  return (
    <UserContext.Provider value={{ userName, setUserName, logout }}>
      {children}
    </UserContext.Provider>
  );
}
