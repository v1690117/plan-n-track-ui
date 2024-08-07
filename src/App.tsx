import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

let patterns = [
  2000, //vibrate one time for 2 seconds
  [2000, 1000, 2000, 1000, 2000, 1000, 2000],
  [400, 200, 400, 200, 400, 200, 800, 200, 800, 200, 400, 200, 400, 200, 200, 200], //vibrate "Twinkle, Twinkle, Little Star"
  [150, 50, 150, 50, 300, 100, 150, 50, 150, 50, 300, 100, 150, 50, 150, 50], //vibrate "Super Mario Bros" theme
  [300, 200, 300, 200, 300, 400, 300, 200, 300, 200, 300, 400, 300, 200, 600, 200] //vibrate "Jingle Bells"
];

function vibrationPattern(index: number){
  if (!window.navigator.vibrate){
    alert("Your device does not support the Vibration API. Try on an Android phone!");
  }
  else {
    window.navigator.vibrate(patterns[index]);
  }
}

function App() {
  const [index, setIndex] = useState(0);
  const onClick = () => {
    setIndex(prev => prev +1);
    vibrationPattern(index % patterns.length);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={onClick}>Vibrate!</button>
      </header>
    </div>
  );
}

export default App;
