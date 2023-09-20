import logo from './logo.svg';
import './App.css';

function App() {
  setInterval(function(){
    ('#slide2>ul').delay(2500);
    ('#slide2>ul').animate({marginTop: "-300px"})
    ('#slide2>ul').delay(2500);
    ('#slide2>ul').animate({marginTop: "-600px"})
    ('#slide2>ul').delay(2500);
    ('#slide2>ul').animate({marginTop: "0px"})
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
