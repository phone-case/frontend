import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider, useUser } from './components/UserContext/UserContext';
import { Navigate } from 'react-router-dom';

import Main from './pages/main/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';
import Create from './pages/create/index';
import Design from './pages/design/index';

function App() {
  const storedUserName = localStorage.getItem('userName');

  return (
    <UserProvider initialUserName={storedUserName}>
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
    return <Navigate to="/login" replace />;
  } else {
    return <Create />;
  }
}

function DesignRoute() {
  const { userName } = useUser();

  if (userName) {
    return <Navigate to="/login" replace />;
  } else {
    return <Design />;
  }
}

export default App;
