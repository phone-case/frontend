import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './components/UserContext/UserContext';
import Main from './pages/main/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';
import Create from './pages/create/index';
import Design from './pages/design/index';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreateRoute />} />
          <Route path="/design" element={<DesignRoute />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

function CreateRoute() {
  const { userName } = useUser();

  if (userName) {
    return <Create />;
  } else {
    // 로그인되어 있지 않을 경우, 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }
}

function DesignRoute() {
  const { userName } = useUser();

  if (userName) {
    return <Design />;
  } else {
    // 로그인되어 있지 않을 경우, 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }
}

export default App;
