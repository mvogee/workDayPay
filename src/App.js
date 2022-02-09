import logo from './logo.svg';
import './App.css';
import {React, useState, useRef} from 'react';

function timerDisplayReadout(seconds) {
  let readout = "";
  let days, hours, minutes;
  days = Math.floor(seconds / 86400);
  seconds %= 86400;
  hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  minutes = Math.floor(seconds / 60);
  seconds %= 60;
  readout += days > 0 ? days + ":" : "";
  readout += hours > 9 ? hours + ":" : "0" + hours + ":";
  readout += minutes > 9 ? minutes + ":" : "0" + minutes + ":";
  readout += seconds > 9 ? seconds : "0" + seconds;
  return readout;
}

function App() {
  const started = useRef(false);
  const earningsPerSecond = useRef(0);
  const intervalId = useRef(null);
  const [hourlyRate, updateHrlyRate] = useState(0);
  const [timer, setTimer] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [btnText, setBtnText] = useState('"Clock In"');
  

  let startTime = Date.now();
  
  function hrlyUpdate(e) {
    updateHrlyRate(e.target.value);
  }

  function tick() {
    let delta = Math.floor((Date.now() - startTime) / 1000);

    setTimer(timerDisplayReadout(delta));
    setEarnings((delta * earningsPerSecond.current).toFixed(2));
  }

  function btnClick() {
    console.log(started.current);
    if (!started.current) {
      started.current = true;
      earningsPerSecond.current = hourlyRate / 3600;
      startTime = Date.now();
      intervalId.current = setInterval(tick, 1000);
      console.log("starting", earningsPerSecond.current);
      setBtnText('"Clock Out"');
    }
    else {
      console.log("stopping");
      started.current = false;
      clearInterval(intervalId.current);
      intervalId.current = null;
      setBtnText('"Clock In"');
    }
  }

  function resetBtn() {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    setTimer("00:00:00");
    setEarnings(0);
    updateHrlyRate(0);
    started.current = false;
  }

  return (
    <div className="App">
      <h1>WorkDayPay</h1>
      <label>$/hr
        <input name="hrlyRate" className="hrInput" type="number" placeholder="hourly rate" onChange={hrlyUpdate} value={hourlyRate}></input>
      </label>
      <button className="startStopBtn" onClick={btnClick}>{btnText}</button>
      <div className="timeDisplay">
        <h2><span className="timeText">{timer}</span></h2>
      </div>
      <div className="earningsDisplay">
        <h2>$<span className="earningText">{earnings}</span></h2>
      </div>
      <button className="resetBtn" onClick={resetBtn}>reset</button>
    </div>
  );
}

export default App;
