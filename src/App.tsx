import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // 'Switch' 대신 'Routes'를 사용합니다.
import { UserProvider } from './components/UserContext/UserContext';
import Main from './pages/main/index'
import Login from './pages/login/index';
import Signup from './pages/signup/index';
import Create from './pages/create/index';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes> {/* 'Switch' 대신 'Routes'를 사용합니다. */}
          <Route path="/" element={<Main />} /> {/* 'element' 속성을 사용합니다. */}
          <Route path="/login" element={<Login />} /> {/* 'element' 속성을 사용합니다. */}
          <Route path="/signup" element={<Signup />} /> {/* 'element' 속성을 사용합니다. */}
          <Route path="/create" element={<Create />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
