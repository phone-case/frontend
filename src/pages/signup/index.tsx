// App.tsx
import React from 'react';
import './style.css';
import Header from '../main/Header';

function App() {
  return (
    <div>
      <Header />
      <div className="create-container">
        <div className="create-form">
          <form action="http://127.0.0.1:5000/api/create/" method="POST">
            <p><input type="text" name="title" placeholder="title" /></p>
            <p><input type="password" name="password" placeholder="password" /></p>
            <p><input type="confirm_password" name="confirm_password" placeholder="confirm_password" /></p>
            <p><input type="text" name="name" placeholder="name" /></p>
            <p><input type="submit" value="create" /></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
