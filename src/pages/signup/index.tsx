import React from 'react';
import './style.css'

function App() {
  return (
    <div className="App">
      <form action="http://127.0.0.1:5000/create/" method="POST">
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p><input type="password" name="password" placeholder="password"></input></p>
            <p><input type="confirm_password" name="confirm_password" placeholder="confirm_password"></input></p>
            <p><input type="text" name="name" placeholder="name"></input></p>
            <p><input type="text" name="role" placeholder="role"></input></p>
            <p><input type="submit" value="create"></input></p>
        </form>
    </div>
  );
}

export default App;