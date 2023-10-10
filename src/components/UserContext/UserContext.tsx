import React, { createContext, useContext, useState } from 'react';



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

  const logout = () => {
    // 로그아웃 로직을 추가: 사용자 이름을 null로 설정
    setUserName(null);
  };

  return (
    <UserContext.Provider value={{ userName, setUserName, logout }}>
      {children}
    </UserContext.Provider>
  );
}
